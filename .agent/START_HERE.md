# START HERE: The Unmapped House

Last updated: `2026-07-11T04-00-07-04-00`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, nine required clues, browser persistence, a descriptor-driven Three.js stage and post processing.

This documentation pass changes no runtime source. It drills into the next transition boundary: Continue mutates story identity before durable save or StageKit replacement is proven, while `StageKit.loadScene()` clears the committed stage before the replacement is fully prepared.

## Plan ledger

**Goal:** keep story state, browser persistence, DOM projection and the committed rendered scene on one atomic transition revision.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all eligible repositories are tracked and have root `.agent` state.
- [x] Select `TheUnmappedHouse` as the oldest eligible documented repository.
- [x] Identify the interaction loop, domains, kits and services.
- [x] Trace Continue through mutation, stage replacement, projection, save and first frame.
- [x] Document prepare, commit, rollback, resource retirement and validation gaps.
- [x] Add a new timestamped tracker and audit set.
- [x] Push only to `main`; create no branch or pull request.

## Selection

```txt
AetherVale
HorrorCorridor
IntoTheMeadow
MyCozyIsland
PhantomCommand
PrehistoricRush
TheCavalryOfRome      excluded
TheOpenAbove
TheUnmappedHouse      selected
ZombieOrchard
```

No eligible repository was new, missing from the central ledger or missing root `.agent` state. `TheUnmappedHouse` had the oldest prior central update, `2026-07-11T01-38-28-04-00`.

## Runtime path

```txt
index.html
  -> src/game.js
  -> load and shallow-merge localStorage
  -> construct StageKit and start recursive RAF
  -> load current scene descriptors
  -> inspect hotspot through DOM or raycast
  -> mutate inspections, clues and notebook log
  -> derive completion and schedule delayed interlude
  -> Continue mutates story scene, route and log
  -> hide interlude
  -> StageKit clears the live committed group
  -> allocate the next scene directly into live renderer state
  -> project DOM
  -> save state
  -> eventually render the next frame
```

## Main finding

The transition is not atomic.

```txt
story mutation       happens before stage preparation
interlude close       happens before stage preparation
live stage clear      happens before replacement success
DOM projection        happens before durable save result
resource retirement   has no disposal proof
first rendered frame  has no acknowledgement
```

A stage-construction failure can leave in-memory story state on the next scene, the durable save on the prior scene, the interlude hidden and the stage blank or partial. A save failure after successful stage construction can leave the visible scene ahead of the reload state.

## Current authority

```txt
src/story-data.js   = story and visual descriptors
src/game.js         = mutable story, phase, Continue, DOM and persistence orchestration
src/stage-kit.js    = live Three.js resources, picking, scene replacement and rendering
src/aspect-frame.js = fixed 16:9 layout policy
```

## Read this pass first

```txt
.agent/trackers/2026-07-11T04-00-07-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T04-00-07-04-00.md
.agent/architecture-audit/2026-07-11T04-00-07-04-00-story-stage-transition-dsk-map.md
.agent/render-audit/2026-07-11T04-00-07-04-00-live-stage-replacement-commit-gap.md
.agent/gameplay-audit/2026-07-11T04-00-07-04-00-continue-transition-failure-loop.md
.agent/interaction-audit/2026-07-11T04-00-07-04-00-continue-to-first-frame-result-map.md
.agent/lifecycle-audit/2026-07-11T04-00-07-04-00-stage-resource-retirement-contract.md
.agent/deploy-audit/2026-07-11T04-00-07-04-00-story-stage-transition-fixture-gate.md
```

## Next safe ledge

```txt
TheUnmappedHouse Atomic Story/Stage Transition Authority
+ Prepare/Commit/Discard and First-Frame Fixture Gate
```

Implementation order:

```txt
versioned durable StorySnapshot and typed persistence results
  -> explicit story phase and Continue admission
  -> transition command and candidate snapshot
  -> detached StageKit preparation
  -> durable story commit
  -> atomic stage and DOM commit
  -> first-frame acknowledgement
  -> prior-stage retirement and disposal
  -> rollback and deterministic fixtures
```

## Do not do first

```txt
new rooms or branches
inventory or audio
renderer replacement
shader redesign
camera retuning
visual polish
```