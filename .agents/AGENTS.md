# Market - Workspace Instructions

This project follows four primary design and engineering standards:
1. **Low Poly Cubic / Voxel 3D World**: All Three.js models, characters, animals, and items use chunky blocky geometry (`BoxGeometry`) rather than smooth spheres or cylinders.
2. **Colorful Neo-Brutalist UI**: All menus, HUD overlays, buttons, badges, and controls use thick black borders (`3px - 4px solid #000`), hard offset drop shadows (`4px 4px 0 #000`), vibrant color blocking, **strictly sharp square/rectangular corners (`border-radius: 0px`)**, and mechanical press animations.
3. **Strictly No Standard Emojis (Custom Brutalist SVGs Only)**: Standard OS/platform emojis are strictly prohibited. All icons must be custom, chunky geometric Neo-Brutalist inline SVGs with solid black strokes.
4. **Deterministic Safe Zone Navigation & Map Expansion Protocol**: All NPC movement (Customers, Staff Helpers, Shoplifters) must navigate via the `SupermarketNavGraph` A* waypoint network and adhere to the 4-stage portal transition standard. Whenever new shelves, counters, rooms, or buildings are constructed, their physical AABB boxes and corresponding corridor nodes/edges must be registered, maintaining 100% pairwise reachability and zero obstacle collision.

Detailed guidelines:
- Aesthetic & Design System: see [.agents/rules/aesthetic_rules.md](rules/aesthetic_rules.md)
- Navigation & Map Expansion Protocol: see [.agents/rules/navigation_rules.md](rules/navigation_rules.md)
