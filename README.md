# Amaha Tours

A responsive, frontend-only React website for a private driver and local tour service in Addis Ababa.

## Edit the site

Services, trip ideas and traveler stories are grouped in `app/data/siteData.ts`. Destination details, gallery images and visit notes are in `app/data/places.ts`.

Brand, driver, profile, journey and destination photography is stored in `public/`. The three destination routes are:

- `/places/unity-park`
- `/places/national-museum`
- `/places/entoto-park`

The inquiry form does not save data. It prepares a WhatsApp message in a new tab. Add Amaha's confirmed business number or social handles to `app/data/siteData.ts` when they are available.

## Run locally

Use Node.js 22.13 or newer. Node.js 24 is recommended for the current vinext toolchain.

```bash
npm install
npm run dev
```
