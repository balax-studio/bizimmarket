# Mechanics Deepening Roadmap

## Phase 0: Contract Fixes and Stability
- Make every drafted mechanics object match the fields consumed by UI and game runtime.
- Add regression tests for display-facing fields such as decoration colors, floor names, hygiene score, and prestige stars.
- Keep save compatibility through `normalizeSaveData` for every new system.

## Phase 1: Make the Neighborhood Feel Alive
- Turn resident affinity into visible repeat-customer behavior: preferred products, visit windows, small dialogue bubbles, and loyalty rewards.
- Connect veresiye choices to affinity changes, delayed repayment, and occasional gifts.
- Add one clear neighborhood panel summary: who likes the store, who owes money, and what each resident wants today.

## Phase 2: Product Quality and Pricing Depth
- Attach freshness metadata to harvested/produced items instead of using only item type.
- Let freshness affect shelf price, customer patience, and stale-item transformations.
- Surface product pricing modes with a small per-item control, not only pure mechanics helpers.

## Phase 3: Store Operations Pressure
- Make hygiene, trash, staff fatigue, and tea breaks produce readable tradeoffs.
- Give staff tiredness a visible work-speed effect and predictable recovery path.
- Add security incidents only as occasional high-signal events, not constant interruption.

## Phase 4: Supply Chain and Bulk Economy
- Make wholesale orders arrive with clear ETA, truck animation, and crate unloading decisions.
- Balance wholesale discounts against storage capacity and freshness risk.
- Add tests around pending deliveries, crate pickup, and save/restore.

## Phase 5: Prestige, VIPs, and Long-Term Goals
- Let decoration, hygiene, brand reputation, and resident affinity combine into prestige.
- Use prestige to unlock VIP customers, richer baskets, cosmetic options, and neighborhood upgrades.
- Add an end-of-day summary that explains why prestige changed.

## Phase 6: Branches and Neighborhood Expansion
- Revisit the deferred second branch with separate stock, staff, and neighborhood demand.
- Make neighborhood buildings influence traffic patterns and product demand.
- Add branch-specific save state and focused tests before broad content expansion.
