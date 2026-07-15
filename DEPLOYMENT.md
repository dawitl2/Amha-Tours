# Deploy Amha Tours to Ethio telecom Linux Bronze

The production website is designed for standard Linux/Plesk hosting. The browser receives the prebuilt React site; PHP handles the admin API and MySQL stores editable content, password hashes and remember-login tokens.

## Information to collect from Plesk

After the hosting account is active, collect these values from the control panel:

1. Plesk login URL and account username.
2. The domain status for `amhatours.com.et` and the nameservers shown by Ethio telecom.
3. The newest available PHP version (PHP 8.2 or 8.3 is preferred) and handler (PHP-FPM is preferred when available).
4. A new MySQL database name, database username, database password and database host. The host is often `localhost`, but use exactly what Plesk displays.
5. Whether the free SSL certificate is active for both `amhatours.com.et` and `www.amhatours.com.et`.

Do not send database or Plesk passwords in public messages or commit them to Git.

## Build and upload

On a development computer:

```powershell
npm install
npm run build
npm run check:php
Compress-Archive -Path .\out\* -DestinationPath .\amha-tours-plesk.zip -Force
```

In Plesk:

1. Open **Websites & Domains > amhatours.com.et > Hosting Settings** and confirm the document root (normally `httpdocs`).
2. Choose PHP 8.2 or 8.3 and PHP-FPM if offered.
3. Open **Databases**, create one MySQL database and one dedicated database user.
4. Open **File Manager**, enter `httpdocs`, remove only the provider's temporary landing-page files, and upload/extract `amha-tours-plesk.zip` there.
5. In `httpdocs/api`, copy `config.example.php` to `config.php` and enter the database values.
6. Generate two different random secrets of at least 32 bytes and set `app_secret` and `install_token`. In PowerShell, run this twice:

```powershell
[Convert]::ToHexString([Security.Cryptography.RandomNumberGenerator]::GetBytes(32)).ToLower()
```

7. Browse to `https://amhatours.com.et/admin/setup/` and complete the one-time installation using private administrator credentials.
8. Sign in at `/admin/` and replace any temporary password immediately when prompted.
9. In Plesk, enable the free SSL certificate and the redirect from HTTP to HTTPS if it is not already active.
10. Delete the local ZIP if it contains a configured `config.php`. The repository ignores that file, but it should still be treated as a secret.

## Updating later

Build again and upload the new contents of `out`. Preserve these server files and folders:

- `api/config.php`
- `uploads/`

The database is not replaced by a frontend upload. All dashboard content remains in MySQL.

Plesk also supports remote Git repositories when the Git extension is enabled, but this hosting package does not require Node.js on the server. The simplest reliable workflow for this plan is to build locally and upload the `out` archive.

Official references: [Plesk web hosting and document roots](https://docs.plesk.com/en-US/obsidian/quick-start-guide/plesk-functionality-explained/managing-web-hosting.74401/), [Plesk databases](https://docs.plesk.com/en-US/obsidian/administrator-guide/website-management/website-databases.70619/), and [Plesk Git support](https://docs.plesk.com/en-US/obsidian/administrator-guide/website-management/git-support.75824/).
