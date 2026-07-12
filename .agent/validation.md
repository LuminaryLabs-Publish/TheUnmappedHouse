# Validation: The Unmapped House

Timestamp: `2026-07-11T21-48-44-04-00`

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
repo-local docs pushed to main: pending
central ledger sync: pending
central internal change log: pending
```

## Plan ledger

**Goal:** define executable evidence required before canonical content identity, stable progression, immutable descriptors, save compatibility and manifest-to-visible-frame correctness can be claimed.

- [x] Record the current syntax-only validation boundary.
- [x] Define structural, semantic, graph, ownership, render-descriptor, freeze and fingerprint fixture rows.
- [x] Define startup reconciliation and deployed browser evidence.
- [x] Generate and parse the updated `.agent/kit-registry.json`.
- [ ] Implement and execute the validation gate.
- [ ] Synchronize the repo-local audit with the central ledger and internal change log.

## Available validation

`npm run check` syntax-checks:

```txt
src/aspect-frame.js
src/game.js
src/stage-kit.js
src/story-data.js
```

It does not construct a StoryManifest, validate ids or descriptors, build indexes, resolve a successor graph, deep-freeze content, compute a fingerprint, reconcile save content, allocate a stage from an admitted plan or correlate content identity with a visible frame.

## Required validation commands

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

## Required structural rows

```txt
manifest-root-required
manifest-id-required
schema-version-required
schema-version-supported
content-version-required
title-required
initial-scene-required
scenes-array-nonempty
scene-id-required
scene-title-required
hotspot-id-required
grant-id-required
requirement-id-required
```

## Required identity and uniqueness rows

```txt
scene-ids-unique
hotspot-ids-unique-within-scene
clue-ids-canonical
initial-scene-resolves
manifest-id-stable
manifest-version-stable
```

## Required progression rows

```txt
nonterminal-scene-has-one-successor
successor-resolves
terminal-scene-explicit
unsupported-cycle-rejected
array-order-does-not-define-progression
legacy-three-scene-order-preserved
```

## Required clue and requirement rows

```txt
all-grants-resolve
all-requirements-resolve
requirement-owner-declared
required-clue-reachable
unreachable-requirement-rejected
cross-owned-requirement-rejected-or-explicit
duplicate-grant-policy-explicit
```

## Required render-descriptor rows

```txt
camera-position-three-finite-values
camera-lookat-three-finite-values
camera-fov-supported
fog-finite-nonnegative
layer-size-positive-finite
layer-position-finite
prop-kind-supported
prop-dimensions-positive-finite
hotspot-size-positive-finite
hotspot-position-finite
material-colors-valid
material-scale-finite-positive
post-values-finite-bounded
unsupported-descriptor-rejected-before-stage-allocation
```

## Required canonicalization, freeze and fingerprint rows

```txt
canonical-order-stable
equivalent-input-same-fingerprint
semantic-change-new-fingerprint
nonsemantic-object-key-order-same-fingerprint
admitted-root-frozen
admitted-scenes-frozen
admitted-hotspots-frozen
admitted-stage-descriptors-frozen
mutation-attempt-cannot-change-fingerprint
manifest-observation-detached
manifest-observation-json-safe
manifest-journal-bounded
```

## Required startup compatibility rows

```txt
empty-save-admits-initial-scene
valid-save-manifest-match-admitted
unknown-saved-scene-explicitly-reconciled
unknown-saved-scene-never-remains-persisted-behind-visible-fallback
manifest-mismatch-requires-migration-or-rejection
removed-hotspot-reconciled
removed-clue-reconciled
rejected-save-not-overwritten
stage-allocation-waits-for-manifest-and-snapshot-admission
```

## Required render-parity rows

```txt
stage-plan-cites-manifest-id
stage-plan-cites-manifest-version
stage-plan-cites-manifest-fingerprint
scene-resource-set-cites-scene-id
hotspot-set-cites-canonical-hotspot-ids
side-panel-cites-canonical-hotspot-ids
first-visible-frame-cites-manifest-fingerprint
successor-frame-cites-same-admitted-graph
mutable-source-object-cannot-change-live-frame
```

## Browser matrix

```txt
Chrome current
Firefox current
Safari current where available
empty storage
valid current save
unknown scene id
removed hotspot id
removed clue id
manifest fingerprint mismatch
1280x720 DPR 1
1920x1080 DPR 2
3840x2160 DPR 2 under admitted surface policy
```

## Browser smoke

```txt
admit current content and capture manifest identity
verify StageKit is not allocated before admission
boot from empty storage and render the declared initial scene
boot from each valid scene id
inject unknown scene id and verify typed reconciliation
attempt duplicate ids and malformed render descriptors and verify pre-allocation rejection
attempt to mutate admitted descriptors and verify no runtime change
advance through explicit successor edges
reach an explicit terminal scene
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
snapshot schema version
snapshot manifest fingerprint
scene id
stage-plan fingerprint
hotspot-set fingerprint
visible frame id
admission result
reconciliation result
bounded observation or artifact reference
```

## Validation claim

This pass documents the proof surface for StoryManifest identity, schema, canonical indexes, explicit progression, clue ownership, render-descriptor validation, deep freeze, deterministic fingerprinting, save compatibility, detached observations and manifest-to-visible-frame parity. It does not claim those runtime authorities or fixtures are implemented.
