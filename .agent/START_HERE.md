# START HERE: The Unmapped House

Last updated: `2026-07-11T21-48-44-04-00`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, browser persistence, a fixed 16:9 shell, and a descriptor-driven Three.js stage.

The current audit promotes the authored story data into an explicit authority boundary. The runtime currently exports one mutable `scenes` array, infers progression from array order, passes nested descriptors by reference into UI closures and Three.js `userData`, and starts without validating ids, clue ownership, successor edges, render descriptors, schema version, or fingerprint.

## Plan ledger

**Goal:** admit one canonical, immutable and fingerprinted StoryManifest before save hydration, stage allocation, input binding or story mutation can begin.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries and root `.agent` state.
- [x] Select only `TheUnmappedHouse`, the oldest eligible repository by central timestamp.
- [x] Trace story-data export, startup selection, scene progression, clue requirements, side-panel closures, StageKit descriptor consumption, hotspot `userData`, persistence and terminal projection.
- [x] Identify all active domains, all 24 implemented kits, and their services.
- [x] Define StoryManifest schema, indexes, graph, validation, freeze, fingerprint, result, observation, journal and fixture boundaries.
- [x] Add timestamped architecture, render, gameplay, interaction, story-manifest, deploy, tracker and turn-ledger records.
- [x] Refresh the required root `.agent` state.
- [x] Change no runtime source.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement and execute the documented authority and fixture gate.

## Read this first

```txt
.agent/trackers/2026-07-11T21-48-44-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Current audit set

```txt
.agent/architecture-audit/2026-07-11T21-48-44-04-00-story-manifest-authority-dsk-map.md
.agent/render-audit/2026-07-11T21-48-44-04-00-mutable-descriptor-visible-frame-provenance-gap.md
.agent/gameplay-audit/2026-07-11T21-48-44-04-00-array-order-scene-progression-loop.md
.agent/interaction-audit/2026-07-11T21-48-44-04-00-manifest-admission-lookup-result-map.md
.agent/story-manifest-audit/2026-07-11T21-48-44-04-00-schema-index-freeze-fingerprint-contract.md
.agent/deploy-audit/2026-07-11T21-48-44-04-00-story-manifest-fixture-gate.md
```

## Main finding

```txt
story-data module
  -> exports mutable title and scenes array
  -> startup shallow-loads raw browser state
  -> unknown saved scene falls back visually to scenes[0]
  -> saved state.sceneId remains unreconciled
  -> StageKit consumes the selected descriptor by reference
  -> hotspot meshes store descriptor references in userData
  -> side-panel buttons close over the same descriptor objects
  -> Continue infers the successor from array index + 1
```

No manifest identity, schema version, canonical index, successor graph, terminal descriptor, deep freeze, fingerprint or admission result exists.

## Concrete failure cases

```txt
duplicate scene id
  -> first matching scene wins; route and successor semantics become ambiguous

unknown saved scene id
  -> first scene renders while the invalid id remains persisted

scene array reorder
  -> Continue graph and old-save meaning change without a version transition

unknown or cross-owned required clue
  -> completion can become impossible or be satisfied by unrelated global state

malformed camera, geometry or material descriptor
  -> failure occurs after browser state and renderer construction have started

descriptor mutation after boot
  -> UI closures, stage state and hotspot userData change without a manifest revision
```

## Required parent domain

```txt
the-unmapped-house-story-manifest-authority-domain
```

Required composition:

```txt
story-manifest-schema-kit
story-manifest-id-kit
story-manifest-version-kit
story-manifest-canonicalization-kit
story-scene-index-kit
story-hotspot-index-kit
story-clue-index-kit
story-successor-graph-kit
story-terminal-descriptor-kit
story-requirement-ownership-kit
story-render-descriptor-schema-kit
story-manifest-deep-freeze-kit
story-manifest-fingerprint-kit
story-manifest-admission-kit
story-manifest-result-kit
legacy-story-data-adapter-kit
story-manifest-observation-kit
story-manifest-journal-kit
story-manifest-fixture-kit
story-manifest-render-parity-fixture-kit
```

## Required invariant

```txt
No story state, renderer resource, input binding or save snapshot becomes authoritative
until exactly one canonical StoryManifest has been validated, indexed, deep-frozen
and fingerprinted.

Every scene transition resolves through an explicit successor edge.
Every hotspot, clue and requirement resolves through canonical indexes.
Every rendered descriptor cites the admitted manifest id, version and fingerprint.
```

## Dependency order

```txt
1. StoryManifest schema, canonical indexes, validation, deep freeze and fingerprint
2. StorySnapshot startup admission, migration, reconciliation and typed persistence
3. Pointer Observation and Hotspot Pick Authority
4. InspectionCommand, receipts, clue provenance and scene-completion proof
5. Atomic Continue transition and first-visible-frame acknowledgement
6. Runtime session lifecycle and scene-resource retirement
7. Render Surface Resolution Authority
8. WebGL Context Recovery Authority
9. Committed-frame diagnostics
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
npm run check: not run because the execution container could not resolve github.com
browser smoke: not run
manifest schema fixture: unavailable
duplicate-id fixture: unavailable
successor-graph fixture: unavailable
freeze/fingerprint fixture: unavailable
manifest-to-render parity fixture: unavailable
```

Do not claim StoryManifest correctness, save compatibility, stable progression, immutable descriptors, canonical lookup or render provenance until the documented fixture gate passes.
