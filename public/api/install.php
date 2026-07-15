<?php

declare(strict_types=1);

require __DIR__ . '/lib/bootstrap.php';
require_method('GET', 'POST');
send_security_headers(true);

try {
    $data = [];
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = request_json();
        $providedToken = (string) ($data['installToken'] ?? '');
        $expectedToken = (string) (config()['install_token'] ?? '');
        if (strlen($expectedToken) < 20 || str_contains($expectedToken, 'CHANGE_ME') || !hash_equals($expectedToken, $providedToken)) {
            json_response(['ok' => false, 'error' => 'The installation token is incorrect.'], 403);
        }
    }

    $pdo = db();
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        try {
            $installed = (bool) $pdo->query("SELECT COUNT(*) FROM app_meta WHERE meta_key = 'installed_at'")->fetchColumn();
        } catch (Throwable) {
            $installed = false;
        }
        json_response(['ok' => true, 'installed' => $installed]);
    }

    $pdo->exec("CREATE TABLE IF NOT EXISTS app_meta (
        meta_key VARCHAR(100) PRIMARY KEY,
        meta_value TEXT NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    if ((bool) $pdo->query("SELECT COUNT(*) FROM app_meta WHERE meta_key = 'installed_at'")->fetchColumn()) {
        json_response(['ok' => false, 'error' => 'Installation is already locked.'], 409);
    }

    $username = trim((string) ($data['username'] ?? 'amha'));
    $password = (string) ($data['password'] ?? '');
    if (!preg_match('/^[A-Za-z0-9_-]{3,40}$/', $username) || strlen($password) < 7) {
        json_response(['ok' => false, 'error' => 'Use a valid username and a password of at least 7 characters.'], 422);
    }

    $pdo->exec("CREATE TABLE IF NOT EXISTS admins (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(40) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        must_change_password TINYINT(1) NOT NULL DEFAULT 1,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    $pdo->exec("CREATE TABLE IF NOT EXISTS site_content (
        id TINYINT UNSIGNED PRIMARY KEY,
        content_json LONGTEXT NOT NULL,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    $pdo->exec("CREATE TABLE IF NOT EXISTS remember_tokens (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        admin_id INT UNSIGNED NOT NULL,
        selector CHAR(24) NOT NULL UNIQUE,
        validator_hash CHAR(64) NOT NULL,
        user_agent_hash CHAR(64) NOT NULL,
        expires_at DATETIME NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX remember_admin (admin_id),
        INDEX remember_expiry (expires_at),
        CONSTRAINT remember_admin_fk FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    $pdo->exec("CREATE TABLE IF NOT EXISTS login_attempts (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        ip_hash CHAR(64) NOT NULL,
        success TINYINT(1) NOT NULL DEFAULT 0,
        attempted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX attempt_lookup (ip_hash, attempted_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    $pdo->beginTransaction();
    $admin = $pdo->prepare('INSERT INTO admins (username, password_hash, must_change_password) VALUES (:username, :password_hash, 1)');
    $admin->execute(['username' => $username, 'password_hash' => password_hash($password, PASSWORD_DEFAULT)]);
    $content = $pdo->prepare('INSERT INTO site_content (id, content_json) VALUES (1, :content_json)');
    $content->execute(['content_json' => json_encode(seed_content(), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)]);
    $meta = $pdo->prepare("INSERT INTO app_meta (meta_key, meta_value) VALUES ('installed_at', :installed_at)");
    $meta->execute(['installed_at' => gmdate(DATE_ATOM)]);
    $pdo->commit();

    json_response(['ok' => true, 'installed' => true, 'message' => 'Installation complete. Sign in and change the initial password.']);
} catch (Throwable $error) {
    if (isset($pdo) && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    error_log('Amha Tours install error: ' . $error->getMessage());
    json_response(['ok' => false, 'error' => 'Setup could not connect to MySQL. Check api/config.php and the Plesk database settings.'], 503);
}
