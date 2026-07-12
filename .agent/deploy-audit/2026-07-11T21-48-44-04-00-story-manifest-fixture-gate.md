# StoryManifest fixture gate

Timestamp: `2026-07-11T21-48-44-04-00`

## Goal

Define the checks required before a deployed build may claim stable content identity, progression, save compatibility or render provenance.

## Required local gate

```txt
npm run check
npm run validate:story-manifest
```

`validate:story-manifest` must cover:

```txt
schema and supported versions
unique scene and hotspot ids
clue grant and requirement resolution
requirement ownership and reachability
explicit successor and terminal graph
render descriptor validation
canonical ordering
deep freeze
deterministic fingerprint
legacy content parity
save reconciliation
manifest-to-stage and manifest-to-frame parity
```

## Required deployed smoke

```txt
load empty storage
load each valid scene
load unknown scene id
load manifest fingerprint mismatch
advance through all explicit successors
reach explicit terminal
attempt source descriptor mutation
verify stage and side-panel canonical ids
verify first visible frame fingerprint
```

## Evidence row

```txt
commitSha
pagesUrl
browser
viewport
manifestId
schemaVersion
contentVersion
manifestFingerprint
snapshotResult
sceneId
scenePlanFingerprint
hotspotSetFingerprint
visibleFrameId
result
artifactReference
```

## Current status

The gate is documentation-only. The repository has syntax checks but no StoryManifest executable fixture or browser provenance smoke.
