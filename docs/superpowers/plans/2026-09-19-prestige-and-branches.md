# Phase 5: Prestige, VIPs, Long-Term Goals & Branches Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a comprehensive Prestige & VIP progression system (combining decoration, hygiene, brand reputation, and resident affinity) with an end-of-day prestige diagnostic report, alongside a full Satellite Branch system (2. Şube - Çarşı Şubesi) with separate stock, staff, neighborhood demand boosts, persistence, and automated test coverage.

**Architecture:** 
- Pure logic functions in `js/mechanics.js` for store prestige calculation, VIP eligibility, rich basket generation, end-of-day prestige ledger tracking, satellite branch management, and neighborhood demand integration.
- UI layer in `js/game.js` and `style.css` following strict Neo-Brutalist guidelines (0px border-radius, 3px-4px solid #000 border, 4px 4px 0 #000 shadow, zero unicode platform emojis).
- Full state normalization and backward-compatible persistence in `normalizeSaveData` for branch data and prestige ledger.
- Comprehensive test coverage in `tests/branches-and-prestige.test.js` and `tests/mechanics.test.js`.

**Tech Stack:** Vanilla JavaScript (ES6+), Three.js (Low-Poly Voxel), HTML5 / CSS3 (Neo-Brutalism), Node.js test runners.

## Global Constraints
- Low Poly Cubic / Voxel 3D World: BoxGeometry only, no smooth spheres or cylinders.
- Neo-Brutalist UI: Zero border-radius (`border-radius: 0px !important`), 3px-4px solid #000 borders, 4px 4px 0 #000 box-shadow.
- Standard platform emojis are strictly prohibited (use ASCII tags like `[LV1]`, `[P3]`, `[ŞUBE]` or Neo-Brutalist inline SVGs).
- Three.js VRAM Memory standard: `traverse()` dispose for geometries/materials.
- Input focus isolation: All `<input>` / `<textarea>` focus prevents game key shortcuts. Modals close with Escape.
- Deterministic test suite: All tests must run cleanly via `node tests/*.test.js` with 100% pass rate.
