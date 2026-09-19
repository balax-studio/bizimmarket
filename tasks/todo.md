# Task List: Three.js Visual & Mechanical Alignment

- [x] Task 1: Environment, Lighting & Floor Palette Alignment
  - Acceptance: Floor uses soft cyan-blue grid texture matching original game, ambient/directional light softened, camera position matches isometric high-angle view.
  - Verify: Load `http://localhost:8080/index.html` and verify scene background and floor color.
  - Files: `js/game.js`, `style.css`

- [x] Task 2: Player Character Model Refinement
  - Acceptance: Player character features green body, cream head, red visor cap, and walking leg animations with stack inertia.
  - Verify: Walk player around mart with WASD/joystick and observe character model and hat.
  - Files: `js/entities.js`

- [x] Task 3: Customer Shopping Cart System
  - Acceptance: Customers push miniature silver wireframe shopping carts with coral handles; items transferred into basket.
  - Verify: Watch incoming customers push carts to shelf, load tomatoes into basket, and push to checkout.
  - Files: `js/entities.js`

- [x] Task 4: Stand & Checkout Counter Visual Redesign
  - Acceptance: Tomato shelf features blue stand with overhead tomato sign; checkout counter features coral desk and cash tray; unlock pads styled with dashed brackets and 3D floating dollar bills.
  - Verify: Inspect shelf, checkout desk, and unlock pads in browser.
  - Files: `js/entities.js`

- [x] Task 5: Gameplay & Economy Balancing Verification
  - Acceptance: Smooth customer queueing, transaction cash spawning, unlock pad money feeding, and 60 FPS performance.
  - Verify: Play full cycle: harvest -> stock shelf -> customer checkout -> collect cash -> unlock expansion pad.
  - Files: `js/game.js`, `js/entities.js`
