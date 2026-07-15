<?php

declare(strict_types=1);

require __DIR__ . '/lib/bootstrap.php';
require_method('POST');
send_security_headers(true);
require_admin();
require_csrf();

if (!isset($_FILES['image']) || !is_array($_FILES['image'])) {
    json_response(['ok' => false, 'error' => 'Choose an image to upload.'], 422);
}
$file = $_FILES['image'];
if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
    json_response(['ok' => false, 'error' => 'The image upload failed.'], 422);
}
if ((int) ($file['size'] ?? 0) > 6 * 1024 * 1024) {
    json_response(['ok' => false, 'error' => 'Images must be 6 MB or smaller.'], 413);
}

$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime = $finfo->file((string) $file['tmp_name']);
$extensions = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'];
if (!isset($extensions[$mime])) {
    json_response(['ok' => false, 'error' => 'Upload a JPG, PNG, or WebP image.'], 422);
}
if (@getimagesize((string) $file['tmp_name']) === false) {
    json_response(['ok' => false, 'error' => 'The uploaded file is not a valid image.'], 422);
}

$uploadDir = __DIR__ . '/../uploads';
if (!is_dir($uploadDir) && !mkdir($uploadDir, 0755, true) && !is_dir($uploadDir)) {
    json_response(['ok' => false, 'error' => 'The uploads folder is not writable.'], 500);
}
$filename = date('Ymd') . '-' . bin2hex(random_bytes(12)) . '.' . $extensions[$mime];
$destination = $uploadDir . '/' . $filename;
if (!move_uploaded_file((string) $file['tmp_name'], $destination)) {
    json_response(['ok' => false, 'error' => 'The server could not save the image.'], 500);
}
json_response(['ok' => true, 'url' => '/uploads/' . $filename]);
