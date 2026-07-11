# START HERE: The Unmapped House

Last updated: `2026-07-11T08-11-14-04-00`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, nine required clues, browser persistence and a descriptor-driven Three.js stage.

This documentation pass changes no runtime source. It promotes the first implementation prerequisite: the story definition and persisted state have no canonical manifest identity, schema version, field validation, reconciliation policy or typed load/save result.

## Plan ledger

**Goal:** make story definitions and browser persistence deterministic, versioned and reconcilable so every later inspection, completion, Continue and render transaction operates on a canonical `StoryManifest` and admitted `StorySnapshot`.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are centrally tracked and have root `.agent` state.
- [x] Select only `TheUnmappedHouse` as the oldest eligible documented repository.
- [x] Identify the interaction loop, domains, kits and services.
- [x] Trace story definition, localStorage load, fallback, mutation, save and reset paths.
- [x] Document manifest identity, save-admission, migration and reconciliation gaps.
- [x] Add a timestamped tracker, turn ledger and system audits.
- [x] Push only to `main`; create no branch or pull request.

## Selection

```txt
AetherVale           2026-07-11T06-29-11-04-00
HorrorCorridor       2026-07-11T07-30-40-04-00
IntoTheMeadow        2026-07-11T06-38-59-04-00
MyCozyIsland         2026-07-11T07-01-49-04-00
PhantomCommand       2026-07-11T07-38-25-04-00
PrehistoricRush      2026-07-11T07-08-45-04-00
TheCavalryOfRome     excluded
TheOpenAbove         2026-07-11T07-18-44-04-00
TheUnmappedHouse     2026-07-11T06-21-57-04-00 selected
ZombieOrchard        2026-07-11T07-59-08-04-00
```

No eligible repository was new, absent from the central ledger or missing root `.agent` state. `TheUnmappedHouse` retained the oldest eligible central timestamp.

## Interaction loop

```txt
read localStorage key ending in .v1
  -> JSON.parse arbitrary payload
  -> shallow-merge payload over initial state
  -> resolve currentScene from saved sceneId or silently fall back to scene zero
  -> retain the uncorrected saved sceneId
  -> construct StageKit and recursive RAF
  -> consume mutable scene descriptors directly
  -> inspect through side-panel or raycast descriptor payload
  -> mutate inspections, clues and log
  -> derive completion from global clue strings
  -> write the full mutable object back to localStorage
  -> Continue mutates scene identity and stage
  -> R removes the key and reloads the page
```

## Main finding

The save-key suffix says `v1`, but the saved value is not a versioned envelope. It has no schema version, story manifest id, definition fingerprint, save revision, story revision, phase or migration history.

`loadState()` shallow-merges arbitrary parsed JSON. The runtime can therefore admit malformed field types, unknown scene ids, orphaned inspections, forged clues and incompatible route/log data. An unknown saved `sceneId` displays scene zero but remains in `state.sceneId`, so the runtime and persisted identity diverge and the invalid id is saved again.

Current completion authority is also reconstructible from raw caller-controlled save fields:

```txt
inspected hotspot receipts: absent
clue provenance: absent
manifest ownership proof: absent
completion proof: absent
```

## Current kit families

```txt
shell and aspect framing
story and render descriptors
browser story runtime
scene route, inspection, clue and notebook ledgers
interlude and terminal projection
localStorage persistence
Three.js stage, materials, post processing, picking and parallax
diagnostics, syntax checking, Pages deployment and audit ledgers
```

## Required parent domain

```txt
the-unmapped-house-story-manifest-persistence-domain
```

Update the existing story-data, browser-runtime, route, inspection, clue, persistence and debug kits first. Add only the missing coordination surfaces:

```txt
story-manifest-schema-kit
story-manifest-index-kit
story-manifest-fingerprint-kit
story-snapshot-schema-kit
story-snapshot-normalizer-kit
versioned-save-envelope-kit
save-admission-kit
save-reconciliation-kit
save-migration-kit
story-load-result-kit
story-save-result-kit
story-state-fingerprint-kit
story-persistence-journal-kit
manifest-persistence-fixture-kit
```

## Ordered implementation queue

```txt
1. Versioned Story Manifest + Save Admission/Reconciliation Fixture Gate
2. Inspection Command Authority + Scene/Hotspot/Clue Fixture Gate
3. Atomic Story/Stage Continue Transition + First-Frame Fixture Gate
4. Runtime Session Lifecycle and Resource Retirement
5. Committed frame and diagnostics proof
```

## Next safe ledge

```txt
TheUnmappedHouse Versioned Story Manifest Authority
+ Save Admission, Migration and Reconciliation Fixture Gate
```
