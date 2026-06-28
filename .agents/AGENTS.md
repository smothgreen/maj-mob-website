# Maj Mob Website - Project Rules

This is the project configuration for the **Maj Mob Website**, a static platform for Mah Jongg classes and open play events in the Twin Cities.

## Technical Stack & Constraints
1. **Core Technologies**: The project is built entirely on vanilla **HTML5**, **CSS3**, and **JavaScript (ES6)**.
2. **Frameworks**: Do not introduce heavy frontend frameworks (e.g., React, Vue, Next.js) or utility CSS frameworks (e.g., TailwindCSS) unless explicitly requested by the user, as the development environment lacks Node/NPM.
3. **Local Dev Server**: Use the Ruby WEBrick server started via the `./start.sh` script on port `8000`.

## Architecture & File Structure
- [index.html](file://./index.html): Main website entry point containing content sections (Hero, About, Classes, Mob Around Town schedule, Contact Form).
- [style.css](file://./style.css): Custom CSS stylesheets containing design tokens, animations, responsive grids, and typography.
- [app.js](file://./app.js): Client-side JavaScript containing header scrolling, mobile navigation toggles, schedule filter buttons, intersection observer reveals, and contact form handling.
- [_assets/](file://./_assets/): Image, video, and media assets.
  - Active Logo: `_assets/images/logo.jpg` (updated logo with character tiles).

## Behavioral Rules for Antigravity Agents
- Always check the status of the local Ruby server before proposing edits to client-side behaviors.
- Ensure any added styles are responsive and preserve the brand aesthetic defined in `style.css`.
- Keep any updates within the boundaries of the static architecture.
