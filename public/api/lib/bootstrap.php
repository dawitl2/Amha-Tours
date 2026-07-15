<?php

declare(strict_types=1);

const AMHA_ROOT = __DIR__ . '/..';
const REMEMBER_COOKIE = '__Host-amha_remember';

function config(): array
{
    static $config;
    if (is_array($config)) {
        return $config;
    }

    $path = AMHA_ROOT . '/config.php';
    if (!is_file($path)) {
        throw new RuntimeException('The application is not configured yet. Copy api/config.example.php to api/config.php.');
    }

    $loaded = require $path;
    if (!is_array($loaded)) {
        throw new RuntimeException('api/config.php must return a configuration array.');
    }

    $config = $loaded;
    return $config;
}

function is_https(): bool
{
    return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
}

function send_security_headers(bool $private = false): void
{
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
    header('Referrer-Policy: same-origin');
    header("Permissions-Policy: camera=(), microphone=(), geolocation=()");
    if ($private) {
        header('Cache-Control: no-store, max-age=0');
        header('Pragma: no-cache');
    }
}

function json_response(array $payload, int $status = 200): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function request_json(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || strlen($raw) > 2_500_000) {
        json_response(['ok' => false, 'error' => 'The request is too large.'], 413);
    }
    $data = json_decode($raw ?: '{}', true);
    if (!is_array($data)) {
        json_response(['ok' => false, 'error' => 'Invalid JSON request.'], 400);
    }
    return $data;
}

function require_method(string ...$allowed): void
{
    if (!in_array($_SERVER['REQUEST_METHOD'] ?? 'GET', $allowed, true)) {
        header('Allow: ' . implode(', ', $allowed));
        json_response(['ok' => false, 'error' => 'Method not allowed.'], 405);
    }
}

function db(): PDO
{
    static $pdo;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $database = config()['database'] ?? [];
    foreach (['host', 'name', 'user', 'password'] as $key) {
        if (!isset($database[$key]) || str_contains((string) $database[$key], 'CHANGE_ME')) {
            throw new RuntimeException('Database configuration is incomplete.');
        }
    }

    $dsn = sprintf(
        'mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4',
        $database['host'],
        (int) ($database['port'] ?? 3306),
        $database['name']
    );
    $pdo = new PDO($dsn, $database['user'], $database['password'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    return $pdo;
}

function start_admin_session(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    $secure = is_https();
    session_name($secure ? '__Host-amha_admin_session' : 'amha_admin_session');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => $secure,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    ini_set('session.use_strict_mode', '1');
    ini_set('session.use_only_cookies', '1');
    session_start();
}

function csrf_token(): string
{
    start_admin_session();
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
    return (string) $_SESSION['csrf'];
}

function require_csrf(): void
{
    start_admin_session();
    $provided = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    if (!is_string($provided) || empty($_SESSION['csrf']) || !hash_equals((string) $_SESSION['csrf'], $provided)) {
        json_response(['ok' => false, 'error' => 'Your session security token expired. Refresh and try again.'], 403);
    }
}

function client_fingerprint(): string
{
    $secret = (string) (config()['app_secret'] ?? '');
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    return hash_hmac('sha256', $ip, $secret);
}

function user_agent_hash(): string
{
    return hash('sha256', substr((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 500));
}

function remember_cookie_name(): string
{
    return is_https() ? REMEMBER_COOKIE : 'amha_remember';
}

function clear_remember_cookie(): void
{
    setcookie(remember_cookie_name(), '', [
        'expires' => time() - 3600,
        'path' => '/',
        'secure' => is_https(),
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
}

function issue_remember_token(int $adminId): void
{
    $selector = bin2hex(random_bytes(12));
    $validator = bin2hex(random_bytes(32));
    $expires = new DateTimeImmutable('+30 days');

    $statement = db()->prepare(
        'INSERT INTO remember_tokens (admin_id, selector, validator_hash, user_agent_hash, expires_at)
         VALUES (:admin_id, :selector, :validator_hash, :user_agent_hash, :expires_at)'
    );
    $statement->execute([
        'admin_id' => $adminId,
        'selector' => $selector,
        'validator_hash' => hash('sha256', $validator),
        'user_agent_hash' => user_agent_hash(),
        'expires_at' => $expires->format('Y-m-d H:i:s'),
    ]);

    setcookie(remember_cookie_name(), $selector . ':' . $validator, [
        'expires' => $expires->getTimestamp(),
        'path' => '/',
        'secure' => is_https(),
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
}

function establish_admin_session(array $admin): void
{
    start_admin_session();
    session_regenerate_id(true);
    $_SESSION['admin_id'] = (int) $admin['id'];
    $_SESSION['username'] = (string) $admin['username'];
    $_SESSION['must_change_password'] = (bool) $admin['must_change_password'];
    $_SESSION['csrf'] = bin2hex(random_bytes(32));
}

function try_remember_login(): bool
{
    start_admin_session();
    if (!empty($_SESSION['admin_id'])) {
        return true;
    }

    $cookie = $_COOKIE[remember_cookie_name()] ?? '';
    if (!is_string($cookie) || !str_contains($cookie, ':')) {
        return false;
    }
    [$selector, $validator] = explode(':', $cookie, 2);
    if (!preg_match('/^[a-f0-9]{24}$/', $selector) || !preg_match('/^[a-f0-9]{64}$/', $validator)) {
        clear_remember_cookie();
        return false;
    }

    $statement = db()->prepare(
        'SELECT rt.id AS token_id, rt.validator_hash, rt.user_agent_hash, a.id, a.username, a.must_change_password
         FROM remember_tokens rt JOIN admins a ON a.id = rt.admin_id
         WHERE rt.selector = :selector AND rt.expires_at > NOW() LIMIT 1'
    );
    $statement->execute(['selector' => $selector]);
    $admin = $statement->fetch();
    $valid = $admin
        && hash_equals((string) $admin['validator_hash'], hash('sha256', $validator))
        && hash_equals((string) $admin['user_agent_hash'], user_agent_hash());

    $delete = db()->prepare('DELETE FROM remember_tokens WHERE selector = :selector');
    $delete->execute(['selector' => $selector]);

    if (!$valid) {
        clear_remember_cookie();
        return false;
    }

    establish_admin_session($admin);
    issue_remember_token((int) $admin['id']);
    return true;
}

function current_admin(): ?array
{
    start_admin_session();
    try {
        try_remember_login();
    } catch (Throwable) {
        return null;
    }
    if (empty($_SESSION['admin_id'])) {
        return null;
    }
    return [
        'id' => (int) $_SESSION['admin_id'],
        'username' => (string) $_SESSION['username'],
        'mustChangePassword' => (bool) ($_SESSION['must_change_password'] ?? false),
    ];
}

function require_admin(bool $allowPasswordChange = false): array
{
    $admin = current_admin();
    if (!$admin) {
        json_response(['ok' => false, 'error' => 'Authentication required.'], 401);
    }
    if ($admin['mustChangePassword'] && !$allowPasswordChange) {
        json_response(['ok' => false, 'error' => 'Change the initial password before continuing.', 'mustChangePassword' => true], 403);
    }
    return $admin;
}

function seed_content(): array
{
    $raw = file_get_contents(AMHA_ROOT . '/seed-content.json');
    $content = json_decode($raw ?: '{}', true);
    return is_array($content) ? $content : [];
}

function read_content(): array
{
    $statement = db()->query('SELECT content_json, updated_at FROM site_content WHERE id = 1');
    $row = $statement->fetch();
    if (!$row) {
        return ['content' => seed_content(), 'updatedAt' => null];
    }
    $content = json_decode((string) $row['content_json'], true);
    return [
        'content' => is_array($content) ? $content : seed_content(),
        'updatedAt' => $row['updated_at'],
    ];
}

send_security_headers(false);
