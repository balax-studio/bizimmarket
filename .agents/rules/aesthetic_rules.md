# Workspace Design & Aesthetic Rules

These rules define the mandatory visual identity and design system for the project. Every developer, agent, and subagent working on this codebase must adhere strictly to these standards.

---

## 1. 3D Art Direction: Low Poly Cubic / Voxel Aesthetic

The 3D world must follow a cohesive, charming **Low Poly Cubic / Voxel** visual language (inspired by Crossy Road, Minecraft, and hyper-casual blocky arcade hits):

1. **Geometry Discipline**:
   - Prefer `BoxGeometry` (cubes and rectangular prisms) over smooth curved primitives (`SphereGeometry`, `CylinderGeometry`, `TorusGeometry`).
   - Characters, animals, produce, furniture, and environmental structures must be composed of clean, chunky blocks with sharp or flat facets.
   - Avoid smooth normals or curved organic meshes where blocky primitives provide superior stylized charm.

2. **Character & Creature Design**:
   - **Stickmen & Customers**: Blocky heads, cuboid torsos, rectangular limbs, and chunky block sneakers. Hats, bows, and accessories are stylized blocky shapes.
   - **Chicken & Animals**: Voxel-style cubic anatomy (cube body, cube head, rectangular beak, cube comb/wattle, cubic tail). Animations should feature snappy, rhythmic block motions (e.g. snappy head bobs, blocky pecks).
   - **Produce & Goods**:
     - Tomatoes: Chunky red cube with a cubic green stem on top.
     - Eggs: Crisp faceted / cubic white blocks.
     - Wheat: Rectangular golden crop bales.
     - Currency: Crisp rectangular emerald green money bricks.

3. **World & Props**:
   - Planter troughs, supermarket stands, checkout counters, and fences must be constructed with stepped, modular block pieces.
   - Materials must have flat, clean shading with tactile roughness (`roughness: 0.25 - 0.45`, low metalness) to give a toy-like, collectible feel.
   - Directional light must cast crisp, defined contact shadows to emphasize the cubic geometry.

---

## 2. 2D UI & Menus: Colorful Neo-Brutalist Design System

All 2D menus, HUD elements, modals, buttons, and badges must follow the **Colorful Neo-Brutalist** design system:

1. **Strictly Square & Rectangular Geometry (`border-radius: 0px`)**:
   - **All buttons, badges, HUD pills, cards, stickers, dialogs, and controls MUST be sharp squares or rectangles (`border-radius: 0px`).**
   - Rounded pills, circular buttons, and rounded corner cards are strictly prohibited.
   - Every button must feel like a crisp, chunky mechanical arcade block.

2. **Borders & Outlines**:
   - Every major interactive element, card, pill, and button must have a thick, solid black border:
     `border: 3px solid #000000;` (or `4px solid #000000;` on large hero cards).

3. **Shadows & Elevation**:
   - **No soft blurry shadows.** All shadows must be hard, solid offset blocks:
     `box-shadow: 4px 4px 0px #000000;` (normal)
     `box-shadow: 6px 6px 0px #000000;` (prominent cards / bottom objective)
     `box-shadow: 2px 2px 0px #000000;` (compact badges)

4. **Mechanical Micro-Interactions**:
   - Every clickable button or interactive block must feature a tactile, mechanical press state:
     ```css
     button:active {
       transform: translate(2px, 2px);
       box-shadow: 2px 2px 0px #000000;
     }
     ```

5. **Color Palette (Vibrant Pop Blocks)**:
   - High-contrast, saturated primary and secondary color blocking:
     - **Canary / Acid Yellow**: `#FFE600` (Used for currency badges, highlight accents)
     - **Hot Coral / Punchy Red**: `#FF5252` (Used for alerts, tomatoes, primary CTAs)
     - **Electric Mint / Green**: `#25D366` / `#2ECC71` (Used for success, level completions)
     - **Vivid Sky Cyan**: `#00D2D3` (Used for store identity, objectives, cool accents)
     - **Playful Violet / Purple**: `#A29BFE` (Used for secondary actions, special bots)
     - **Dark Ink Black**: `#000000` (Used for all borders, shadows, and high-contrast text)
     - **Clean Canvas White**: `#FFFFFF` / Off-white Cream `#FFFDF5`

6. **Typography & Badges**:
   - Heavy, bold, punchy sans-serif typography (`Fredoka`, `Space Grotesk`, weight 700 to 900).
   - Uppercase labels with slight letter-spacing for badges and titles.
   - Text over light color blocks must be solid black (`#000000`) for maximum legibility (WCAG AAA).

7. **Strictly No Standard Emojis (Custom Brutalist SVG Icons Only)**:
   - Platform emojis (such as 🍅, 🐔, 🎮, 🔊, 🔄, ⭐, 💵) are strictly forbidden across all UI, HUD, buttons, and badges.
   - All icons must be custom, chunky Neo-Brutalist inline SVGs designed with bold geometric silhouettes, thick solid black strokes (`2px - 2.5px #000`), sharp zero-radius geometry, and vibrant saturated flat color fills.

