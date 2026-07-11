# START HERE: The Unmapped House

Last updated: `2026-07-11T06-21-57-04-00`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three scenes, nine hotspots, nine required clues, browser persistence and a descriptor-driven Three.js stage.

This documentation pass changes no runtime source. It identifies the next authority gap: side-panel buttons and raycast meshes pass full hotspot descriptors directly into story mutation without proving scene membership, story revision, phase, stage epoch, command identity or clue provenance.

## Plan ledger

**Goal:** make every inspection a scene-scoped, deterministic command whose canonical hotspot, clue grants, completion proof, persistence result and rendered feedback can be correlated.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all eligible repositories are tracked and have root `.agent` state.
- [x] Select only `TheUnmappedHouse` as the oldest eligible documented repository.
- [x] Identify the interaction loop, domains, kits and services.
- [x] Trace side-panel and raycast inspection ingress.
- [x] Document stale-scene, forged-payload, duplicate and render-correlation gaps.
- [x] Add a timestamped tracker, turn ledger and system audits.
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

No eligible repository was new, absent from the central ledger or missing root `.agent` state. `TheUnmappedHouse` retained the oldest eligible central timestamp, `2026-07-11T04-00-07-04-00`.

## Interaction loop

```txt
load shallow-merged localStorage state
  -> resolve currentScene
  -> construct StageKit and recursive RAF
  -> load scene descriptors
  -> render side-panel hotspot buttons
  -> create invisible Three.js hotspot meshes
  -> side-panel closure or raycast supplies full descriptor
  -> inspectHotspot(descriptor)
  -> record descriptor.id under currentScene.id
  -> grant descriptor.grants into global clues
  -> derive completion
  -> optionally schedule delayed interlude
  -> project DOM and save
  -> Continue mutates story and replaces live stage
```

## Main finding

`inspectHotspot()` trusts an authority-bearing descriptor object from either input surface. It never verifies that the hotspot belongs to the committed scene or stage. The caller controls the id, clue grants, label, text and log copy used by the mutation.

```txt
scene id in command: absent
hotspot membership check: absent
story revision: absent
story phase: absent
stage epoch: absent
command id: absent
input sequence: absent
canonical clue provenance: absent
typed result: absent
committed feedback frame: absent
```

A stale old-scene descriptor can be recorded beneath the new `currentScene.id`; duplicate side-panel/raycast admissions can create repeated log and save effects; and current global clue strings do not prove which accepted inspection produced completion.

## Current kit families

```txt
story and scene descriptors
mutable story, route, inspection, clue and notebook state
side-panel, raycast and keyboard input
localStorage effects
interlude and terminal projection
Three.js stage, shaders, post processing and picking
fixed-aspect layout
syntax validation and Pages deployment
repo-local and central audit ledgers
```

The complete kit/service map is in `.agent/current-audit.md` and `.agent/kit-registry.json`.

## Read this pass first

```txt
.agent/trackers/2026-07-11T06-21-57-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T06-21-57-04-00.md
.agent/architecture-audit/2026-07-11T06-21-57-04-00-inspection-command-authority-dsk-map.md
.agent/render-audit/2026-07-11T06-21-57-04-00-hotspot-stage-epoch-consumption-gap.md
.agent/gameplay-audit/2026-07-11T06-21-57-04-00-inspection-clue-completion-loop.md
.agent/interaction-audit/2026-07-11T06-21-57-04-00-dual-ingress-command-admission-map.md
.agent/hotspot-authority-audit/2026-07-11T06-21-57-04-00-scene-hotspot-clue-contract.md
.agent/deploy-audit/2026-07-11T06-21-57-04-00-inspection-authority-fixture-gate.md
```

## Ordered implementation queue

```txt
1. Versioned Story Manifest and StorySnapshot
2. Inspection Command Authority + Scene/Hotspot/Clue Fixture Gate
3. Atomic Story/Stage Continue Transition + First-Frame Fixture Gate
4. Runtime Session Lifecycle and Resource Retirement
5. Bounded committed-frame diagnostics
```

## Next safe ledge

```txt
TheUnmappedHouse Inspection Command Authority
+ Scene/Hotspot/Clue and Dual-Ingress Fixture Gate
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
