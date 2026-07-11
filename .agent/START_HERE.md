# START HERE: The Unmapped House

Last updated: `2026-07-11T15-30-50-04-00`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, browser persistence, a fixed 16:9 shell, and a descriptor-driven Three.js stage.

The current audit isolates StorySnapshot startup authority. `loadState()` parses one raw localStorage value and shallow-merges arbitrary fields over defaults. Unknown scenes, forged clues, impossible routes, unknown inspections, invalid field types, and oversized logs can enter the candidate. `StageKit` then allocates WebGL resources, installs listeners, and starts its recursive RAF before UI projection or the startup storage write proves the candidate is usable.

Malformed JSON is silently converted to defaults and then overwritten during the unconditional startup save. Semantically invalid JSON can crash after the renderer is already live. An unknown `sceneId` can show scene one while persistence keeps the unknown id. Storage write failure can occur after stage and UI state are visible with no rollback.

## Plan ledger

**Goal:** admit one versioned, manifest-bound, canonical StorySnapshot before any renderer, stage, UI, listener, RAF, or persistence mutation becomes authoritative.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` state.
- [x] Select only `TheUnmappedHouse` under the oldest eligible fallback rule.
- [x] Trace storage read, parse, shallow merge, scene fallback, StageKit allocation, live scene construction, UI projection, startup write, reset, and reload.
- [x] Identify the interaction loop, domains, implemented kits, and offered services.
- [x] Define manifest admission, versioned envelope, migration, semantic validation, reconciliation, non-destructive rejection, bootstrap preparation, rollback, first-frame, result, journal, and fixture boundaries.
- [x] Add timestamped architecture, render, gameplay, interaction, StorySnapshot, deploy, tracker, and turn-ledger records.
- [x] Refresh all required root `.agent` state.
- [x] Change no runtime source.
- [x] Push only to `main` and create no branch or pull request.
- [ ] Implement the prerequisite StoryManifest and StorySnapshot startup authority.

## Read this first

```txt
.agent/trackers/2026-07-11T15-30-50-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Current audit set

```txt
.agent/architecture-audit/2026-07-11T15-30-50-04-00-story-snapshot-startup-admission-dsk-map.md
.agent/render-audit/2026-07-11T15-30-50-04-00-invalid-save-bootstrap-stage-projection-gap.md
.agent/gameplay-audit/2026-07-11T15-30-50-04-00-save-hydration-scene-clue-route-divergence-loop.md
.agent/interaction-audit/2026-07-11T15-30-50-04-00-boot-reset-load-result-admission-map.md
.agent/story-snapshot-audit/2026-07-11T15-30-50-04-00-versioned-load-reconciliation-contract.md
.agent/deploy-audit/2026-07-11T15-30-50-04-00-story-snapshot-bootstrap-fixture-gate.md
```

## Main finding

```txt
raw localStorage value
  -> broad read/parse catch
  -> shallow merge without schema or semantic admission
  -> currentScene resolves separately from state.sceneId
  -> StageKit allocates renderer, target, canvas, listeners and RAF
  -> live scene resources are built
  -> UI assumes valid field shapes
  -> mutable state is written back unconditionally
```

Missing evidence:

```txt
StoryManifest id, schema and fingerprint
save envelope version
raw-read and parse results
migration receipts
semantic admission result
manifest-aware reconciliation receipts
story and save revisions
canonical snapshot fingerprint
corrupt-save quarantine
bootstrap generation and stage epoch
rollback result
first-bootstrap-frame acknowledgement
typed save and clear results
bounded persistence journal
```

## Required next parent domain

```txt
the-unmapped-house-story-snapshot-startup-authority-domain
```

Required composition:

```txt
story-manifest-schema-kit
story-manifest-index-kit
story-manifest-fingerprint-kit
story-save-envelope-kit
story-save-raw-read-kit
story-save-parse-kit
story-save-migration-kit
story-snapshot-schema-kit
story-snapshot-semantic-admission-kit
story-snapshot-reconciliation-kit
story-snapshot-fingerprint-kit
story-load-result-kit
story-save-result-kit
corrupt-save-quarantine-kit
bootstrap-candidate-kit
bootstrap-stage-preparation-kit
bootstrap-commit-kit
bootstrap-rollback-kit
first-bootstrap-frame-ack-kit
story-persistence-journal-kit
story-snapshot-fixture-kit
browser-bootstrap-failure-smoke-kit
```

## Required startup invariant

```txt
No rejected or failed save candidate may:
  overwrite the raw stored payload
  mutate the committed StorySnapshot
  expose a partial stage or UI projection
  leave listeners, RAF chains or WebGL resources alive
  publish a false ready state
  advance story or save revisions
```

## Dependency order

```txt
1. Versioned StoryManifest and canonical indexes
2. StorySnapshot startup admission, migration, reconciliation and typed persistence
3. Inspection Command Authority and scene-completion proof
4. Atomic Continue transition and first-frame acknowledgement
5. Runtime session lifecycle and resource retirement
6. Committed-frame diagnostics
```

## Validation status

```txt
runtime source changed: no
rendering changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
StorySnapshot admission fixtures: unavailable
migration/reconciliation fixtures: unavailable
bootstrap rollback fixtures: unavailable
first-bootstrap-frame fixture: unavailable
```

Do not claim startup, persistence, migration, reconciliation, recovery, or first-frame correctness until the documented fixture gate passes.