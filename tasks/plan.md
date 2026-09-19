# Implementation Plan: Three.js Visual & Mechanical Alignment

This plan breaks down the transfer of visual elements, character models, shopping cart dynamics, and economy tuning from the original Unity game into the Three.js codebase.

## Major Components & Build Order

1. **Visual Styling & World Environment (`js/game.js`, `style.css`)**
   - Update floor shader/material to iconic soft cyan-blue `#82b1ff` with subtle grid lines.
   - Adjust directional and ambient light to achieve soft, sunny hyper-casual lighting with realistic contact shadows.
   - Tune camera FOV and isometric angle to match the original viewing perspective.

2. **Player Character Model (`js/entities.js`)**
   - Reconstruct player model: Green torso/body, cream head, red visor/cap, and animated walking limbs.
   - Maintain backpack tower swaying physics while aligning carry positions.

3. **Customer AI & Shopping Cart Model (`js/entities.js`)**
   - Build procedural wireframe shopping cart mesh (silver basket, four small caster wheels, coral push handle).
   - Attach cart to customer's front; animate customer pushing cart towards tomato shelf and checkout counter.
   - Place harvested tomatoes into the cart basket when picked up by customer.

4. **Stands, Cashier Counter & Unlock Pads (`js/entities.js`)**
   - Reskin tomato shelf into blue/teal stand with 3D tomato signpost overhead.
   - Reskin checkout counter with coral-pink desk body, computer register, and cash collection tray.
   - Reskin unlock pads into dashed white boundary boxes with floating 3D cash note and price label.

5. **Economy & Pacing Tuning (`js/game.js`, `js/entities.js`)**
   - Match original early-game economy: $3-$5 per tomato sale, rapid unlock feedback, progressive floor unlocks.

## Verification Checkpoints
- Checkpoint 1: Scene loads cleanly at `http://localhost:8080/index.html` with new floor colors and camera angle.
- Checkpoint 2: Player model walks with red visor and swaying stack.
- Checkpoint 3: Customers push shopping carts, gather tomatoes into cart, and pay at register.
- Checkpoint 4: Unlock pads successfully process dollar transfers with celebration feedback.
