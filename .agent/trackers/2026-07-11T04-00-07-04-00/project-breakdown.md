# Project breakdown: The Unmapped House

Timestamp: `2026-07-11T04-00-07-04-00`

## Plan ledger

**Goal:** preserve the existing three-scene story and visual output while defining one atomic transition boundary that keeps durable story state, DOM projection and the committed StageKit scene on the same revision.

- [x] Compare the ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are tracked and have root `.agent` state.
- [x] Select `TheUnmappedHouse` as the oldest eligible documented repository.
- [x] Read the story runtime, story descriptors, StageKit and validation surface.
- [x] Identify the interaction loop, domains, kits and services.
- [x] Trace Continue from interlude activation through story mutation, stage replacement, UI projection and save.
- [x] Document transition failure, rollback, resource-retirement and first-frame proof gaps.
- [x] Add timestamped architecture, render, gameplay, interaction, lifecycle and deploy audits.
- [x] Refresh the root `.agent` documents and kit registry.
- [x] Push directly to `main` without a branch or pull request.

## Selection

The accessible organization inventory contains:

```txt
AetherVale
HorrorCorridor
IntoTheMeadow
MyCozyIsland
PhantomCommand
PrehistoricRush
TheCavalryOfRome
TheOpenAbove
TheUnmappedHouse
ZombieOrchard
```

`TheCavalryOfRome` is excluded. No eligible repository is new, ledger-missing or root-`.agent`-missing. `TheUnmappedHouse` had the oldest central review timestamp, `2026-07-11T01-38-28-04-00`, so the fallback rule applies.

## Interaction loop

```txt
load saved story state
  -> resolve current scene
  -> construct StageKit and recursive RAF
  -> load scene descriptors
  -> inspect hotspots by DOM button or raycast
  -> mutate inspections, clues and notebook log
  -> derive completion and schedule delayed interlude
  -> Continue mutates currentScene, route and story state
  -> hide interlude
  -> StageKit clears committed objects and builds the next scene in place
  -> project DOM
  -> write localStorage
  -> render the next frame
```

## Main finding

`nextScene()` changes story identity before the next stage is known to be buildable or durable. `StageKit.loadScene()` then clears the committed stage and builds the replacement directly into live renderer state. A descriptor, allocation or shader failure can therefore leave:

```txt
in-memory story = next scene
browser save     = previous scene
DOM projection   = previous or partially updated copy
stage            = blank or partially constructed next scene
interlude         = already hidden
retired resources = detached but undisposed
```

There is no prepare/validate/commit/discard contract, no stage build result, no transition id, no stage epoch and no first-frame acknowledgement.

## Next safe ledge

```txt
TheUnmappedHouse Atomic Story/Stage Transition Authority
+ Prepare/Commit/Discard and First-Frame Fixture Gate
```

This follows the existing durable save and explicit story-phase prerequisites. It does not change story content, framing, shaders or pacing.