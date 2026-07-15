<?php

declare(strict_types=1);

require __DIR__ . '/lib/bootstrap.php';
require_method('POST');
send_security_headers(true);
require_admin(true);
require_csrf();

$cookie = $_COOKIE[remember_cookie_name()] ?? '';
if (is_string($cookie) && str_contains($cookie, ':')) {
    [$selector] = explode(':', $cookie, 2);
    if (preg_match('/^[a-f0-9]{24}$/', $selector)) {
        db()->prepare('DELETE FROM remember_tokens WHERE selector = :selector')->execute(['selector' => $selector]);
    }
}
clear_remember_cookie();
$_SESSION = [];
session_destroy();
json_response(['ok' => true]);
