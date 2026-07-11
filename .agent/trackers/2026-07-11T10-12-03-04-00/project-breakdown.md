# Project breakdown: The Unmapped House

Timestamp: `2026-07-11T10-12-03-04-00`

## Goal

Audit one repository only and define the story-to-stage Continue transaction required to prevent partial scene advancement, stale persistence, leaked Three.js resources and unacknowledged visible frames.

## Plan ledger

- [x] Compare the full `LuminaryLabs-Publish` inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all eligible repositories are tracked and have root `.agent` state.
- [x] Select `TheUnmappedHouse` as the oldest eligible central-ledger entry.
- [x] Read current `.agent` guidance and audit history.
- [x] Read `src/game.js`, `src/stage-kit.js`, `src/story-data.js` and `package.json`.
- [x] Identify the interaction loop.
- [x] Identify all active domains.
- [x] Identify all implemented kits.
- [x] Identify all kit-provided services.
- [x] Trace Continue mutation order and failure windows.
- [x] Trace Three.js resource creation, replacement and retirement.
- [x] Define the transition-authority DSK and fixture gate.
- [x] Refresh required root `.agent` files.
- [x] Add timestamped architecture and system-specific audits.
- [x] Push repo-local documentation directly to `main`.
- [x] Update the central repo ledger and internal change log.
- [ ] Runtime implementation remains future work.

## Selected repository

```txt
LuminaryLabs-Publish/TheUnmappedHouse
```

## Selection reason

No eligible repository was new, absent from the central ledger or missing root `.agent` state. The central ledger timestamp for `TheUnmappedHouse` was the oldest eligible value at selection.

## Main finding

Continue mutates story identity, route, notebook and interlude DOM before stage preparation and persistence can succeed. StageKit clears the live stage before replacement construction, does not dispose previous resources and provides no first-frame receipt. The route therefore has no atomic success or rollback boundary.

## Output

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/turn-ledger/2026-07-11T10-12-03-04-00.md
.agent/architecture-audit/2026-07-11T10-12-03-04-00-story-stage-transition-dsk-map.md
.agent/render-audit/2026-07-11T10-12-03-04-00-live-stage-swap-resource-retirement-gap.md
.agent/gameplay-audit/2026-07-11T10-12-03-04-00-completion-interlude-continue-loop.md
.agent/interaction-audit/2026-07-11T10-12-03-04-00-continue-command-admission-result-map.md
.agent/transition-audit/2026-07-11T10-12-03-04-00-story-save-stage-first-frame-contract.md
.agent/deploy-audit/2026-07-11T10-12-03-04-00-continue-transition-fixture-gate.md
```

## Validation boundary

Documentation only. No runtime source, dependency, package-script, rendering or deployment behavior changed.
