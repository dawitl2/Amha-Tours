<?php

declare(strict_types=1);

require __DIR__ . '/lib/bootstrap.php';
require_method('POST');
send_security_headers(true);

try {
    $data = request_json();
    $username = trim((string) ($data['username'] ?? ''));
    $password = (string) ($data['password'] ?? '');
    $remember = (bool) ($data['remember'] ?? false);
    $fingerprint = client_fingerprint();

    $rate = db()->prepare(
        "SELECT COUNT(*) FROM login_attempts WHERE ip_hash = :ip_hash AND success = 0 AND attempted_at >= (NOW() - INTERVAL 15 MINUTE)"
    );
    $rate->execute(['ip_hash' => $fingerprint]);
    if ((int) $rate->fetchColumn() >= 5) {
        json_response(['ok' => false, 'error' => 'Too many attempts. Wait 15 minutes and try again.'], 429);
    }

    $statement = db()->prepare('SELECT id, username, password_hash, must_change_password FROM admins WHERE username = :username LIMIT 1');
    $statement->execute(['username' => $username]);
    $admin = $statement->fetch();
    $valid = $admin && password_verify($password, (string) $admin['password_hash']);

    $attempt = db()->prepare('INSERT INTO login_attempts (ip_hash, success) VALUES (:ip_hash, :success)');
    $attempt->execute(['ip_hash' => $fingerprint, 'success' => $valid ? 1 : 0]);

    if (!$valid) {
        usleep(300000);
        json_response(['ok' => false, 'error' => 'The username or password is incorrect.'], 401);
    }

    establish_admin_session($admin);
    db()->prepare('DELETE FROM remember_tokens WHERE admin_id = :admin_id AND expires_at <= NOW()')->execute(['admin_id' => $admin['id']]);
    if ($remember) {
        issue_remember_token((int) $admin['id']);
    }

    json_response([
        'ok' => true,
        'authenticated' => true,
        'admin' => current_admin(),
        'csrfToken' => csrf_token(),
    ]);
} catch (Throwable $error) {
    error_log('Amha Tours login error: ' . $error->getMessage());
    json_response(['ok' => false, 'error' => 'Sign in is not configured yet or the database is unavailable.'], 503);
}
