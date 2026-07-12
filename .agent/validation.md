# Validation: The Unmapped House

Timestamp: `2026-07-11T21-48-44-04-00`

## Summary

This was a documentation-only StoryManifest audit. Runtime, gameplay, rendering, dependencies, package scripts and deployment configuration were not changed.

## Plan ledger

**Goal:** define the executable evidence required before canonical content identity, stable progression, immutable descriptors, save compatibility and manifest-to-visible-frame correctness can be claimed.

- [x] Record the current syntax-only validation boundary.
- [x] Define structural, semantic, graph, ownership, render-descriptor, freeze and fingerprint fixture rows.
- [x] Define startup reconciliation and deployed browser evidence.
- [x] Generate and parse the updated `.agent/kit-registry.json`.
- [x] Push repo-local documentation to `main`.
- [x] Synchronize the central ledger and internal change log.
- [ ] Implement and execute the validation gate.

## This pass

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
routes changed: no
gameplay changed: no
rendering changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
reason: execution container could not resolve github.com
browser smoke: not run
manifest schema fixture: unavailable
duplicate-id fixture: unavailable
requirement-ownership fixture: unavailable
successor-graph fixture: unavailable
freeze/fingerprint fixture: unavailable
manifest-render parity fixture: unavailable
kit-registry JSON: generated and parsed locally
repo-local docs pushed to main: yes
central ledger sync: complete
central internal change log: complete
```

## Available validation

`npm run check` syntax-checks:

```txt
src/aspect-frame.js
src/game.js
src/stage-kit.js
src/story-data.js
```

It does not construct a StoryManifest, validate ids or descriptors, build indexes, resolve a successor graph, deep-freeze content, compute a fingerprint, reconcile saved content, allocate a stage from an admitted plan or correlate content identity with a visible frame.

## Required commands

```txt
node scripts/validate-story-manifest-schema.mjs
node scripts/validate-story-manifest-semantics.mjs
node scripts/validate-story-successor-graph.mjs
node scripts/validate-story-manifest-fingerprint.mjs
node scripts/validate-story-manifest-render-parity.mjs
npm run check
```

Recommended aggregate:

```txt
npm run validate:story-manifest
```

## Required fixture rows

### Structure and identity

```txt
manifest-root-required
manifest-id-required
schema-version-supported
content-version-required
initial-scene-resolves
scene-ids-unique
hotspot-ids-unique-within-scene
```

### Progression and requirements

```txt
all-grants-resolve
all-requirements-resolve
requirement-owner-declared
required-clue-reachable
nonterminal-scene-has-one-successor
all-successors-resolve
terminal-scene-explicit
unsupported-cycle-rejected
array-order-does-not-define-progression
```

### Render descriptors

```txt
camera-vectors-finite
camera-fov-supported
fog-finite-nonnegative
geometry-dimensions-positive-finite
prop-kind-supported
material-colors-valid
post-values-finite-bounded
unsupported-descriptor-rejected-before-stage-allocation
```

### Canonicalization, freeze and fingerprint

```txt
canonical-order-stable
equivalent-input-same-fingerprint
semantic-change-new-fingerprint
admitted-root-deep-frozen
mutation-attempt-cannot-change-fingerprint
manifest-observation-detached-json-safe
manifest-journal-bounded
```

### Startup compatibility

```txt
empty-save-admits-initial-scene
valid-save-manifest-match-admitted
unknown-saved-scene-explicitly-reconciled
unknown-saved-scene-never-remains-behind-visible-fallback
manifest-mismatch-requires-migration-or-rejection
rejected-save-not-overwritten
stage-allocation-waits-for-manifest-and-snapshot-admission
```

### Render parity

```txt
stage-plan-cites-manifest-id-version-fingerprint
scene-resource-set-cites-scene-id
hotspot-set-cites-canonical-hotspot-ids
side-panel-cites-canonical-hotspot-ids
first-visible-frame-cites-manifest-fingerprint
mutable-source-object-cannot-change-live-frame
```

## Browser smoke

```txt
admit current content and capture manifest identity
verify StageKit is not allocated before admission
boot from empty storage and each valid scene id
inject unknown scene id and verify typed reconciliation
reject duplicate ids, unknown requirements and malformed render descriptors
attempt descriptor mutation and verify no runtime change
advance through explicit successor edges to an explicit terminal scene
verify stage, side panel, hotspot set and first visible frame cite one fingerprint
```

## Deployment evidence

```txt
commit SHA
GitHub Pages route URL
browser and viewport
manifest id
schema version
content version
manifest fingerprint
snapshot result
scene id
scene-plan fingerprint
hotspot-set fingerprint
visible frame id
bounded observation or artifact reference
```

## Validation claim

The proof surface is documented but not implemented. Do not claim StoryManifest correctness, stable progression, descriptor immutability, save compatibility or content-to-frame provenance until the fixture gate passes.
