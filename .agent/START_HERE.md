# START HERE: The Unmapped House story content graph validation

**Last updated:** `2026-07-16T04-02-40-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Reviewed pre-audit repository head:** `d578c8bdb7ee23f2cc4051f410aed528dfc24b2c`  
**Status:** `story-content-graph-validation-authority-audited`

## Summary

TheUnmappedHouse is a fixed-camera anime-horror point-and-click prototype with three ordered scenes, nine hotspots, clue-led completion, localStorage persistence, semantic DOM controls, and a descriptor-driven Three.js stage.

The active audit isolates authored-content admission. `src/story-data.js` exports a plain mutable array, while `src/game.js` and `src/stage-kit.js` immediately trust scene IDs, hotspot IDs, clue references, camera vectors, stage descriptors, and array order. The package check proves JavaScript syntax only. There is no schema version, content revision, duplicate-ID rejection, reference validation, completion satisfiability analysis, route reachability result, invalid-content fallback, or first validated story-frame acknowledgement.

## Plan ledger

**Goal:** require every authored story revision to pass deterministic identity, reference, descriptor, and reachability validation before runtime or renderer adoption.

- [x] Compare the complete current Publish inventory against central ledgers.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm ten eligible repositories have synchronized central ledgers and root `.agent` state.
- [x] Select only TheUnmappedHouse by the oldest synchronized timestamp.
- [x] Identify the complete interaction loop, all domains, all 24 implemented kits, and their services.
- [x] Trace scene, hotspot, clue, completion, route, camera, stage, material, post, save, and validation assumptions.
- [x] Define one parent story-content authority with 17 coordinating kits.
- [x] Add the timestamped audit family.
- [x] Keep runtime, authored story data, rendering, and deployment unchanged.
- [ ] Implement and execute content-graph validation and source/artifact/Pages fixtures.

## Active gap

```txt
story-data.js exports scenes[]
  -> game resolves saved scene by ID or falls back to scenes[0]
  -> StageKit consumes camera, stage, hotspot, material and post fields directly
  -> inspection state keys by scene ID and hotspot ID
  -> completion requires every listed clue
  -> Continue advances by scenes[] array position

no content admission occurs
  -> duplicate IDs can alias runtime state
  -> unknown or ungrantable clues can make completion impossible
  -> malformed descriptors can fail during stage construction
  -> route order has no explicit reachability proof
  -> syntax checks still pass
```

The current three-scene content appears internally consistent by inspection. This audit documents the missing authority for future authored revisions; it does not claim a reproduced content defect.

## Required authority

`the-unmapped-house-story-content-graph-validation-authority-domain`

```txt
StoryContentValidationCommand
  -> bind ContentRevision and StorySchemaVersion
  -> register scene, hotspot and clue identities
  -> reject duplicate and unknown references
  -> validate route order and terminal reachability
  -> prove completion requirements are satisfiable
  -> validate descriptor shapes and finite numeric values
  -> publish StoryContentValidationResult
  -> admit valid content or project an invalid-content fallback
  -> publish FirstValidatedStoryFrameAck
```

## Read this run first

1. `current-audit.md`
2. `known-gaps.md`
3. `trackers/2026-07-16T04-02-40-04-00/project-breakdown.md`
4. `architecture-audit/2026-07-16T04-02-40-04-00-story-content-graph-validation-dsk-map.md`
5. `story-content-audit/2026-07-16T04-02-40-04-00-identity-reference-reachability-contract.md`
6. `interaction-audit/2026-07-16T04-02-40-04-00-story-content-validation-command-result-map.md`
7. `gameplay-audit/2026-07-16T04-02-40-04-00-unsatisfiable-story-route-loop.md`
8. `render-audit/2026-07-16T04-02-40-04-00-invalid-content-first-frame-gap.md`
9. `deploy-audit/2026-07-16T04-02-40-04-00-story-content-source-artifact-pages-fixture-gate.md`
10. `central-sync-audit/2026-07-16T04-02-40-04-00-oldest-selection-story-content-reconciliation.md`
11. `turn-ledger/2026-07-16T04-02-40-04-00.md`
12. `next-steps.md`
13. `validation.md`

## Retained audits

Browser startup readiness, story save concurrency, story audio, inspection focus, motion preference, story announcements, interlude focus/route, page lifecycle, terminal settlement, WebGL recovery, save schema, viewport, scene-transition composition, render-provider admission, hotspot picking, same-document save/reset convergence, interlude progression, and stage-resource lifecycle remain retained in `kit-registry.json`.

## Next safe ledge

Add a pure story-content validator to the package check and runtime bootstrap, then gate StageKit and interactive controls on an accepted validation result.
