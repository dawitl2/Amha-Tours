<?php

declare(strict_types=1);

$root = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'api';
$iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($root));
$failures = 0;

foreach ($iterator as $file) {
    if (!$file->isFile() || $file->getExtension() !== 'php') {
        continue;
    }
    $command = escapeshellarg(PHP_BINARY) . ' -l ' . escapeshellarg($file->getPathname());
    exec($command, $output, $status);
    echo implode(PHP_EOL, $output) . PHP_EOL;
    $output = [];
    if ($status !== 0) {
        $failures++;
    }
}

exit($failures === 0 ? 0 : 1);
