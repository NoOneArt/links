# Links Page

A simple static links page for artists, creators, and anyone who wants one clean place for their social links.

You can copy this code, change the text, links, avatar, icons, and colors, then use it for your own page.

## What Is Included

- Responsive single-page layout
- Avatar, bio, main links, and social icons
- Local SVG icons and image assets
- Optional Umami analytics for page views and link clicks
- No build step or framework required

## How To Use

1. Edit `index.html` and replace the profile text, links, and labels.
2. Replace files in `assets/` with your own avatar and icons.
3. Adjust colors and spacing in `styles.css`.
4. If you use analytics, update `UMAMI_WEBSITE_ID` in `script.js`.
5. Publish the folder with GitHub Pages or any static hosting provider.

## Analytics

Analytics is handled in `script.js` with Umami. It only runs on the production GitHub Pages domain configured in the code.

If you copy this project, either:

- replace `UMAMI_WEBSITE_ID` with your own Umami website ID, or
- remove the analytics code if you do not need tracking.

`UMAMI_WEBSITE_ID` is public client-side configuration. It is not a secret key.

## Brand Assets

Brand names and logos such as X, Pixiv, Patreon, and ArtStation belong to their respective owners. They are included only to identify links to those services.
## License

This project is released under the MIT License. You are free to copy, modify, and use it for your own links page.
