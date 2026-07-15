<?php

declare(strict_types=1);

require __DIR__ . '/lib/bootstrap.php';
require_method('GET');

try {
    $result = read_content();
    header('Cache-Control: public, max-age=60, stale-while-revalidate=300');
    json_response(['ok' => true] + $result);
} catch (Throwable) {
    // The static seed keeps the public website available during setup or DB maintenance.
    header('Cache-Control: public, max-age=30');
    json_response(['ok' => true, 'content' => seed_content(), 'updatedAt' => null, 'fallback' => true]);
}
