<?php

declare(strict_types=1);

require __DIR__ . '/lib/bootstrap.php';
require_method('POST');
send_security_headers(true);
$admin = require_admin(true);
require_csrf();

$data = request_json();
$currentPassword = (string) ($data['currentPassword'] ?? '');
$newPassword = (string) ($data['newPassword'] ?? '');
if (strlen($newPassword) < 10 || !preg_match('/[A-Za-z]/', $newPassword) || !preg_match('/\d/', $newPassword)) {
    json_response(['ok' => false, 'error' => 'Use at least 10 characters with letters and numbers.'], 422);
}

$statement = db()->prepare('SELECT password_hash FROM admins WHERE id = :id');
$statement->execute(['id' => $admin['id']]);
$hash = (string) $statement->fetchColumn();
if (!$hash || !password_verify($currentPassword, $hash)) {
    json_response(['ok' => false, 'error' => 'The current password is incorrect.'], 401);
}

$update = db()->prepare('UPDATE admins SET password_hash = :password_hash, must_change_password = 0 WHERE id = :id');
$update->execute(['password_hash' => password_hash($newPassword, PASSWORD_DEFAULT), 'id' => $admin['id']]);
db()->prepare('DELETE FROM remember_tokens WHERE admin_id = :id')->execute(['id' => $admin['id']]);
clear_remember_cookie();
$_SESSION['must_change_password'] = false;
session_regenerate_id(true);
json_response(['ok' => true, 'admin' => current_admin(), 'csrfToken' => csrf_token()]);
