<?php

declare(strict_types=1);

require __DIR__ . '/lib/bootstrap.php';
require_method('GET');
send_security_headers(true);

try {
    $admin = current_admin();
    json_response([
        'ok' => true,
        'authenticated' => $admin !== null,
        'admin' => $admin,
        'csrfToken' => $admin ? csrf_token() : null,
    ]);
} catch (Throwable $error) {
    error_log('Amha Tours session error: ' . $error->getMessage());
    json_response(['ok' => false, 'error' => 'The admin database is not configured yet.'], 503);
}
