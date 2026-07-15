<?php

declare(strict_types=1);

// Copy this file to config.php on the server and replace every CHANGE_ME value.
// config.php is ignored by Git and blocked from direct web access.
return [
    'app_url' => 'https://amhatours.com.et',
    'app_secret' => 'CHANGE_ME_TO_A_RANDOM_64_CHARACTER_SECRET',
    'install_token' => 'CHANGE_ME_TO_A_DIFFERENT_RANDOM_INSTALL_TOKEN',
    'database' => [
        'host' => 'localhost',
        'port' => 3306,
        'name' => 'CHANGE_ME_DATABASE_NAME',
        'user' => 'CHANGE_ME_DATABASE_USER',
        'password' => 'CHANGE_ME_DATABASE_PASSWORD',
    ],
];
