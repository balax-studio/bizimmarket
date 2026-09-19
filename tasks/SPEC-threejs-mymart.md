# Spec: Three.js "My Mini Mart" Visual & Mechanics Alignment

## Objective
Elevate the existing Three.js web clone to match the exact visual style, character designs, customer shopping cart mechanics, checkout flow, and economy pacing of the original Unity "My Mini Mart" game. The resulting project remains 100% self-contained, fully offline-capable, and optimized for smooth export to mobile wrappers (Capacitor/Cordova) for Android and iOS.

## Assumptions
1. The game runs client-side using vanilla JavaScript and local Three.js (no npm build steps required).
2. All 3D models (characters, carts, shelves, plants, counters) are built with clean Three.js procedural geometry and materials to guarantee zero load time, crisp scaling, and zero external asset dependencies.
3. Sound effects remain procedurally synthesized through the Web Audio API for 100% offline audio fidelity.
4. Touch controls and responsive screen resizing continue to work seamlessly across mobile, tablet, and desktop viewports.

## Tech Stack
- Engine: Three.js (local r128 build in `js/three.min.js`)
- Logic: Vanilla ES6+ JavaScript (`js/game.js`, `js/entities.js`, `js/audio.js`)
- UI & Styling: Standard HTML5 and CSS3 (`index.html`, `style.css`)
- Server: Python standard library `http.server` (`server.py`)

## Commands
- Dev Server: `python server.py` (serves at `http://localhost:8080`)
- Verification: Headless Chrome DevTools / Playwright test scripts

## Project Structure
- `index.html` - Canvas shell, HUD overlays (currency, joystick, pause/audio toggles)
- `style.css` - Hyper-casual theme styling and responsive layouts
- `js/three.min.js` - Local offline Three.js library
- `js/audio.js` - Procedural Web Audio API sound synthesizer
- `js/entities.js` - Game actors: Player, Shopping Cart Customers, Tomato Plants, Mart Shelves, Cashier Desk, Unlock Pads, Floating Bill Particles
- `js/game.js` - Scene setup, orthographic-style camera angle, lighting, game loop, input handling, and save state

## Code Style
- Vanilla JavaScript with minimal classes/prototypes.
- Clean updates directly in existing entity update loops without unnecessary abstraction layers.
- Clear `ponytail:` comments where intentional performance simplifications exist.

## Testing Strategy
- Manual verification via local browser testing on port 8080.
- Verify 60 FPS performance, stack swaying physics, shopping cart attachment to customer AI, checkout transaction loop, and pad unlocking logic.

## Boundaries
- Always: Preserve 100% offline capability without external CDN dependencies.
- Always: Maintain responsive mobile touch controls alongside keyboard/mouse.
- Never: Introduce external heavy asset bundles or npm build dependencies unless requested.
- Ask first: Major changes to core gameplay loop or genre shifts.

## Success Criteria
1. Mart Floor & Lighting: Soft blue/cyan floor styling with pastel walls and clean shadows matching the original game.
2. Player Visuals: Stickman/bean player featuring green shirt, tan pants, and red visor/cap.
3. Customer Shopping Carts: Customers push miniature silver wireframe shopping carts with coral handles; items transferred into the cart basket upon shelf interaction.
4. Tomato Stand & Shelf: Blue/teal display stand featuring an overhead tomato icon badge and neat grid item placement.
5. Checkout Counter: Pink/coral checkout desk with black terminal and dedicated cash stack tray.
6. Unlock Pads: Dashed white floor brackets with 3D floating bill icon and dynamic price tag.
7. Economy Alignment: Balanced unlock costs and tomato sale prices closely tuned to the original game's early-game progression.
