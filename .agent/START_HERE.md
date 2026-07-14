# START HERE: The Unmapped House story-save schema and manifest admission

**Last updated:** `2026-07-13T19-58-19-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Status:** `story-save-schema-manifest-admission-authority-audited`  
**Retained statuses:** `render-surface-viewport-authority-central-reconciled`, `scene-transition-composition-authority-central-reconciled`, `render-provider-admission-authority-central-reconciled`, `hotspot-input-picking-authority-central-reconciled`, `browser-save-commit-reset-convergence-authority-audited`, `interlude-progression-admission-authority-audited`, `stage-resource-lifecycle-authority-audited`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three scenes, nine hotspots, clue-led progression, browser persistence, a fixed 16:9 shell, a visible Notebook and a descriptor-driven Three.js stage.

The active audit isolates startup save admission. Parseable localStorage values are shallow-merged into live state without type, identifier or story-manifest validation. Unknown scene IDs can remain durable while the first scene is shown, and malformed collection fields can crash or distort later progression.

## Plan ledger

**Goal:** admit one canonical, current-manifest-compatible story state before stage, UI, Notebook or interaction participants become live.

- [x] Compare the full Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are tracked, root-documented and synchronized.
- [x] Select only `TheUnmappedHouse` by the oldest eligible timestamp.
- [x] Trace localStorage read, parse, shallow merge, state consumption, scene fallback, writeback and validation.
- [x] Preserve all 24 implemented kits and offered services.
- [x] Define schema, manifest, migration, quarantine, adoption and visible-proof boundaries.
- [x] Add the timestamped tracker and audit family.
- [ ] Implement and execute the authority.

## Active loop

```txt
raw localStorage value
  -> JSON.parse
  -> shallow merge over initial state
  -> currentScene fallback independent from state repair
  -> stage/UI/Notebook projection
  -> immediate rewrite of the admitted object
  -> later reducers assume array/record shapes
```

## Required authority

```txt
the-unmapped-house-story-save-schema-manifest-admission-authority-domain
```

It coordinates raw document classification, schema and authored-ID validation, migration, quarantine, canonical normalization, startup adoption and first-visible-scene proof. Storage I/O, story authoring, progression reducers and renderer implementation remain bounded services.

## Read this run first

1. `current-audit.md`
2. `known-gaps.md`
3. `trackers/2026-07-13T19-58-19-04-00/project-breakdown.md`
4. `architecture-audit/2026-07-13T19-58-19-04-00-story-save-schema-manifest-admission-dsk-map.md`
5. `save-admission-audit/2026-07-13T19-58-19-04-00-schema-manifest-migration-quarantine-contract.md`
6. `interaction-audit/2026-07-13T19-58-19-04-00-save-document-admission-result-map.md`
7. `gameplay-audit/2026-07-13T19-58-19-04-00-malformed-save-progression-loop.md`
8. `render-audit/2026-07-13T19-58-19-04-00-admitted-state-visible-scene-coherence-gap.md`
9. `deploy-audit/2026-07-13T19-58-19-04-00-save-admission-fixture-gate.md`
10. `central-sync-audit/2026-07-13T19-58-19-04-00-repo-ledger-save-admission-reconciliation.md`
11. `next-steps.md`
12. `validation.md`

## Retained audits

The prior viewport, scene-transition, provider, hotspot-picking, durable-save, progression and stage-lifecycle audits remain valid bounded authorities and are preserved in `kit-registry.json`.

## Next safe ledge

Add pure `parseStorySave()`, `validateStoryState()` and `fingerprintStoryManifest()` functions, then prove malformed and unknown-manifest documents never reach live state.