# Amha Tours

A responsive React website for Amha's private driver and local tour service in Addis Ababa. The production build is static React/Next.js with a PHP 8 + MySQL content API designed for `amhatours.com.et` on Plesk shared hosting.

## Run the frontend locally

Use Node.js 20.19 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The public website uses built-in content when the PHP API is not running.

## Build for Plesk

```bash
npm run build
npm run check:php
```

Upload the contents of `out/` to the domain's Plesk document root (normally `httpdocs`). Next copies the PHP API, `.htaccess`, public images and upload protections into `out` during the build.

Then copy `out/api/config.example.php` to `out/api/config.php` on the server, enter the Plesk MySQL credentials and random secrets, and visit `/admin/setup/` once. See [DEPLOYMENT.md](./DEPLOYMENT.md) for the full checklist.

## Content administration

- `/admin/` signs in to the private dashboard.
- `/admin/setup/` creates the database tables and first administrator exactly once.
- The initial requested login is `amha` / `amha123`; the first login requires a stronger replacement password.
- Passwords are hashed by PHP. Sessions and remember-login tokens are stored server-side; authentication tokens are never placed in browser local storage.
- Public ride inquiries still open WhatsApp and are not stored by this website.
