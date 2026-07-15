<?php

declare(strict_types=1);

require __DIR__ . '/lib/bootstrap.php';
require_method('POST', 'PUT');
send_security_headers(true);
require_admin();
require_csrf();

$data = request_json();
$content = $data['content'] ?? null;
if (!is_array($content)) {
    json_response(['ok' => false, 'error' => 'Content must be an object.'], 422);
}

foreach (['person', 'contact', 'hero'] as $objectSection) {
    if (!isset($content[$objectSection]) || !is_array($content[$objectSection])) {
        json_response(['ok' => false, 'error' => "The {$objectSection} section is invalid."], 422);
    }
}

foreach (['brand', 'person', 'contact', 'hero', 'services', 'places'] as $required) {
    if (!array_key_exists($required, $content)) {
        json_response(['ok' => false, 'error' => "Missing required content section: {$required}."], 422);
    }
}

if (!is_string($content['brand']) || trim($content['brand']) === '' || strlen($content['brand']) > 100) {
    json_response(['ok' => false, 'error' => 'The business name is invalid.'], 422);
}
if (!is_array($content['services']) || count($content['services']) > 30 || !is_array($content['places']) || count($content['places']) > 100) {
    json_response(['ok' => false, 'error' => 'The services or places list is invalid.'], 422);
}

$validWebUrl = static fn (mixed $url): bool => is_string($url)
    && (bool) filter_var($url, FILTER_VALIDATE_URL)
    && in_array(strtolower((string) parse_url($url, PHP_URL_SCHEME)), ['http', 'https'], true);
$validAssetUrl = static fn (mixed $url): bool => is_string($url)
    && (str_starts_with($url, '/') || ((bool) filter_var($url, FILTER_VALIDATE_URL) && in_array(strtolower((string) parse_url($url, PHP_URL_SCHEME)), ['http', 'https'], true)));

if (!$validWebUrl($content['domain'] ?? '') || !$validAssetUrl($content['person']['photo'] ?? '') || !$validAssetUrl($content['hero']['image'] ?? '')) {
    json_response(['ok' => false, 'error' => 'The domain or main image URL is invalid.'], 422);
}
foreach (['whatsappBaseHref', 'whatsappHref', 'telegramHref', 'facebookHref', 'instagramHref'] as $field) {
    if (!$validWebUrl($content['contact'][$field] ?? '')) {
        json_response(['ok' => false, 'error' => "The {$field} value must be a complete HTTPS link."], 422);
    }
}
if (!is_string($content['contact']['phoneHref'] ?? null) || !str_starts_with($content['contact']['phoneHref'], 'tel:')) {
    json_response(['ok' => false, 'error' => 'The telephone link must start with tel:.'], 422);
}

$slugs = [];
foreach ($content['places'] as $place) {
    $slug = $place['slug'] ?? '';
    if (!is_string($slug) || !preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $slug) || isset($slugs[$slug])) {
        json_response(['ok' => false, 'error' => 'Every place needs a unique lowercase URL slug.'], 422);
    }
    $slugs[$slug] = true;
    foreach (($place['images'] ?? []) as $image) {
        if (!$validAssetUrl($image['src'] ?? '')) {
            json_response(['ok' => false, 'error' => "An image URL for {$slug} is invalid."], 422);
        }
    }
    if (!empty($place['officialUrl']) && !$validWebUrl($place['officialUrl'])) {
        json_response(['ok' => false, 'error' => "The official link for {$slug} is invalid."], 422);
    }
}

foreach (['journeys', 'testimonials'] as $section) {
    foreach (($content[$section] ?? []) as $entry) {
        if (!$validAssetUrl($entry['image'] ?? '')) {
            json_response(['ok' => false, 'error' => "An image URL in {$section} is invalid."], 422);
        }
    }
}

$encoded = json_encode($content, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
if ($encoded === false || strlen($encoded) > 2_000_000) {
    json_response(['ok' => false, 'error' => 'Content is invalid or too large.'], 422);
}

$statement = db()->prepare(
    'INSERT INTO site_content (id, content_json) VALUES (1, :content_json)
     ON DUPLICATE KEY UPDATE content_json = VALUES(content_json), updated_at = CURRENT_TIMESTAMP'
);
$statement->execute(['content_json' => $encoded]);
$result = read_content();
json_response(['ok' => true] + $result);
