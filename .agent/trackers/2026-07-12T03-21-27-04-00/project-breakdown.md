# Project breakdown: The Unmapped House

Timestamp: `2026-07-12T03-21-27-04-00`

## Summary

Selected `LuminaryLabs-Publish/TheUnmappedHouse` after comparing the full ten-repository Publish inventory with central tracking. No eligible repository was new, ledger-missing or root-undocumented, so the oldest documented-selection rule applied.

The current ledge is Committed Frame Diagnostics Authority. Story and notebook state commit synchronously, while the canvas is rendered later by an unobserved two-pass RAF with no frame identity or visible acknowledgement.

## Plan ledger

**Goal:** document one authoritative path from accepted story change to immutable frame input, stage/post results, visible canvas acknowledgement and correlated diagnostics.

- [x] Compare the full Publish repository list with central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheUnmappedHouse`.
- [x] Read current root `.agent` state.
- [x] Trace `index.html`, `src/game.js`, `src/stage-kit.js` and `src/aspect-frame.js`.
- [x] Identify the interaction loop.
- [x] Identify all active domains.
- [x] Identify all 24 implemented kits and their services.
- [x] Define the committed-frame parent domain and candidate kits.
- [x] Add architecture, render, gameplay, interaction, committed-frame and deploy audits.
- [x] Refresh required root `.agent` files and registry.
- [x] Push directly to `main` without a branch or PR.
- [ ] Implement and execute fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-undocumented eligible repositories: 0

TheUnmappedHouse    2026-07-12T01-41-56-04-00
AetherVale          2026-07-12T01-58-43-04-00
MyCozyIsland        2026-07-12T02-10-14-04-00
PrehistoricRush     2026-07-12T02-21-55-04-00
TheOpenAbove        2026-07-12T02-29-50-04-00
IntoTheMeadow       2026-07-12T02-38-23-04-00
HorrorCorridor      2026-07-12T02-49-19-04-00
PhantomCommand      2026-07-12T03-00-46-04-00
ZombieOrchard       2026-07-12T03-11-51-04-00
TheCavalryOfRome    excluded
```

## Interaction loop

```txt
inspect or Continue
  -> mutate story/scene state
  -> update DOM/debug JSON
  -> save state
  -> independent RAF later renders stage target and post canvas
  -> no result correlates those outputs
```

## Domains in use

```txt
browser shell and fixed-aspect composition
authored story/render descriptors
mutable story state and raw persistence
inspection, clue, route, log and completion
DOM, interlude and debug projection
Three.js renderer, target, stage and post passes
scene resource construction and replacement
hotspot picking and camera parallax
resize, input, timers and recursive RAF
syntax validation, Pages deployment and audit tracking
```

## Kit inventory

```txt
implemented kits: 24
planned committed-frame kits: 20
```

The complete service map is in `.agent/current-audit.md` and `.agent/kit-registry.json`.

## Main finding

`renderUi()` can expose accepted story state before the corresponding canvas frame exists. `StageKit.animate()` reads mutable live objects and submits two passes without a frame id, frozen input, pass result, failure result or final visible acknowledgement.

## Required parent domain

```txt
the-unmapped-house-committed-frame-diagnostics-authority-domain
```

## Validation boundary

Documentation only. No runtime, rendering, package, dependency or deployment behavior changed.
