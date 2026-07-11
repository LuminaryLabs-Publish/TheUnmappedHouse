# START HERE: The Unmapped House

Last updated: `2026-07-11T10-12-03-04-00`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, nine required clues, browser persistence and a descriptor-driven Three.js stage.

This documentation pass changes no runtime source. It audits the cross-domain Continue path: story state, interlude DOM, live Three.js resources and persistence are mutated sequentially without a transaction, rollback, stage epoch, resource retirement or first-rendered-frame acknowledgement.

## Plan ledger

**Goal:** make scene advancement atomic and observable so Continue either commits one canonical story snapshot, one live stage epoch, one durable save and one visible frame, or leaves the prior scene fully intact.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are centrally tracked and have root `.agent` state.
- [x] Select only `TheUnmappedHouse` under the oldest eligible central-ledger fallback.
- [x] Read the active story, persistence, StageKit and prior audit surfaces.
- [x] Trace completion, delayed interlude, Continue, stage replacement, persistence and rendering.
- [x] Identify all active domains, implemented kits and kit-provided services.
- [x] Document the missing transition, rollback, resource-retirement and frame-acknowledgement boundaries.
- [x] Add a timestamped tracker, turn ledger and system audits.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable fixtures remain future work.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or ledger-missing eligible repositories: 0
root-undocumented eligible repositories: 0
selected: TheUnmappedHouse
excluded: TheCavalryOfRome
```

At selection, the central ledger showed `TheUnmappedHouse` as the oldest eligible entry:

```txt
TheUnmappedHouse     2026-07-11T08-11-14-04-00 selected
AetherVale           2026-07-11T08-18-31-04-00
IntoTheMeadow        2026-07-11T08-31-33-04-00
PrehistoricRush      2026-07-11T08-48-04-04-00
MyCozyIsland         2026-07-11T09-08-59-04-00
TheOpenAbove         2026-07-11T09-21-50-04-00
HorrorCorridor       2026-07-11T09-29-07-04-00
PhantomCommand       2026-07-11T09-40-19-04-00
ZombieOrchard        2026-07-11T10-00-12-04-00
TheCavalryOfRome     excluded
```

## Interaction loop

```txt
load persisted story state
  -> resolve current scene
  -> create StageKit and start recursive RAF
  -> inspect three scene hotspots
  -> derive completion from global clue strings
  -> schedule an unowned 450 ms interlude callback
  -> user presses Continue
  -> mutate currentScene, state.sceneId, route and notebook
  -> hide interlude
  -> clear the live stage
  -> synchronously build replacement Three.js resources
  -> project story DOM
  -> write mutable state to localStorage
  -> next RAF eventually renders the new stage
```

## Main finding

Continue is not one transition. It is an ordered sequence of independent mutations.

`nextScene()` advances story identity and route before calling `StageKit.loadScene()`. `loadScene()` clears the current stage and resets hotspot/material arrays before replacement construction succeeds. `saveState()` runs only after story, DOM and stage mutation, and the renderer provides no first-frame receipt.

A failure can therefore leave:

```txt
story state on the next scene
route and notebook already advanced
interlude already hidden
old stage already detached
new stage only partly built
persisted state still on the prior revision
no rollback reason
no committed-frame proof
```

The replacement path also leaks resources. `stageGroup.clear()` detaches old meshes without disposing their geometries or materials, and `this.materials = []` drops the tracked material references before retirement.

## Current kit families

```txt
shell and fixed-aspect framing
story, scene, hotspot and clue descriptors
browser story runtime
route, inspection, clue and notebook ledgers
completion, interlude and terminal projection
localStorage persistence
Three.js stage, materials, post processing, picking and parallax
live scene replacement and recursive RAF
diagnostics, syntax checking, Pages deployment and audit ledgers
```

## Required parent domain

```txt
the-unmapped-house-story-stage-transition-domain
```

Update the existing browser-runtime, route, interlude, persistence, stage-render and descriptor-consumer kits first. Add only the missing coordination surfaces:

```txt
continue-command-kit
continue-admission-kit
scene-transition-plan-kit
detached-stage-preparation-kit
story-transition-candidate-kit
durable-story-commit-kit
atomic-stage-commit-kit
transition-rollback-kit
transition-result-kit
stage-epoch-kit
first-frame-acknowledgement-kit
retired-stage-resource-kit
stage-resource-disposal-kit
interlude-timeout-lease-kit
transition-journal-kit
continue-transition-fixture-kit
browser-first-frame-smoke-kit
```

## Ordered implementation queue

```txt
1. Versioned Story Manifest and StorySnapshot
2. Save admission, migration and reconciliation
3. Inspection Command Authority and completion proof
4. Atomic Story/Stage Continue Transition
5. Runtime Session Lifecycle and complete resource retirement
6. Committed frame and diagnostics proof
```

## Current audit ledge

```txt
TheUnmappedHouse Atomic Story/Stage Continue Transition Authority
+ Rollback, Resource Retirement and First-Frame Fixture Gate
```
