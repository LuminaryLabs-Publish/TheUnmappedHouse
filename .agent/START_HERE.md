# START HERE: The Unmapped House Destructive Reset Admission Authority

Last updated: `2026-07-12T10-30-00-04-00`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, browser persistence, a fixed 16:9 shell and a descriptor-driven Three.js stage.

The highest-priority newly isolated gap is destructive reset admission. A global `keydown` listener treats every `KeyR` event as permission to remove the only save key and reload the page. The handler does not exclude `Ctrl+R` or `Meta+R`, so a normal browser refresh shortcut can erase progress before the browser reload occurs.

## Plan ledger

**Goal:** make reset an explicit, confirmed and revision-fenced transaction that cannot be triggered by browser refresh shortcuts, stale input, background focus or unowned runtime state.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Skip newer unsynchronized `MyCozyIsland` documentation work.
- [x] Select only `TheUnmappedHouse`, the oldest synchronized eligible repository.
- [x] Identify the complete interaction loop.
- [x] Identify all active domains.
- [x] Preserve all 24 implemented kits and their offered services.
- [x] Trace keyboard reset, localStorage removal, page reload, timer/lifecycle dependencies and persistence effects.
- [x] Add timestamped architecture and system-specific audits.
- [x] Refresh all required root `.agent` files and machine registry.
- [x] Push only to `main`.
- [x] Create no branch or pull request.
- [ ] Runtime reset authority and executable browser fixtures remain future work.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

MyCozyIsland       central 2026-07-12T08:00:16-04:00, repo-local 2026-07-12T10-20-02-04-00, skipped as newer unsynchronized work
TheUnmappedHouse   2026-07-12T08-10-36-04-00 selected oldest synchronized eligible repository
AetherVale         2026-07-12T08-31-49-04-00
PrehistoricRush    2026-07-12T09-01-44-04-00
TheOpenAbove       2026-07-12T09-02-10-04-00
IntoTheMeadow      2026-07-12T09-21-40-04-00
PhantomCommand     2026-07-12T09-28-05-04-00
HorrorCorridor     2026-07-12T09-48-15-04-00
ZombieOrchard      2026-07-12T10-09-07-04-00
TheCavalryOfRome   excluded
```

## Active interaction loop

```txt
boot
  -> load raw localStorage state
  -> select current scene
  -> create StageKit and recursive RAF
  -> project scene and save

normal play
  -> canvas or side-panel inspection
  -> mutate inspected/clue/log state
  -> derive completion
  -> schedule interlude or Continue
  -> save

global reset path
  -> any keydown whose code is KeyR
  -> remove the sole save key immediately
  -> call location.reload()
  -> no modifier exclusion, confirmation, revision check or typed result
```

## Main finding

```txt
Ctrl+R or Meta+R
  -> browser dispatches keydown with code KeyR
  -> game handler removes the save key
  -> browser performs its normal reload
  -> progress is gone after what appeared to be a refresh
```

The same handler also accepts synthetic, repeated and background-context key events. It does not call `preventDefault()`, but preventing the default is not required for the destructive effect because storage removal happens first.

## Domains and kits

```txt
implemented kits: 24
planned reset-authority kits: 22
```

The current domains cover browser hosting, story descriptors, persistence, progression, timers, modal/terminal projection, keyboard and pointer input, Three.js/WebGL rendering, diagnostics, validation and Pages deployment.

## Required authority

```txt
the-unmapped-house-destructive-reset-admission-authority-domain
```

It must own reset intent identity, binding policy, browser-refresh exclusion, focus and trusted-event policy, confirmation capability, expected story/storage revisions, reset generation, tombstone/barrier semantics, timer and runtime retirement, storage effects, reload admission, typed results, observations, journals and browser fixtures.

## Read order

1. `current-audit.md`
2. `known-gaps.md`
3. `architecture-audit/2026-07-12T10-30-00-04-00-destructive-reset-admission-dsk-map.md`
4. `interaction-audit/2026-07-12T10-30-00-04-00-keyboard-reset-command-admission-map.md`
5. `reset-authority-audit/2026-07-12T10-30-00-04-00-refresh-exclusion-confirmed-reset-contract.md`
6. `gameplay-audit/2026-07-12T10-30-00-04-00-browser-refresh-progress-loss-loop.md`
7. `render-audit/2026-07-12T10-30-00-04-00-reset-visible-state-provenance-gap.md`
8. `next-steps.md`
9. `validation.md`

## Next safe ledge

Replace the raw global `KeyR` effect with a typed reset command that ignores browser refresh chords, requires explicit confirmation, validates expected revisions, installs a reset tombstone, retires timers/runtime ownership, clears durable state through a typed effect result and reloads only after the reset transaction commits.
