# Manifest admission and lookup result map

Timestamp: `2026-07-11T21-48-44-04-00`

## Goal

Route every story lookup through one admitted manifest result rather than raw array scans or descriptor references.

## Current ingress

```txt
saved scene id
  -> scenes.find
  -> raw object or scenes[0] fallback

side-panel button
  -> closed-over hotspot object

canvas pick
  -> hotspot object from mesh.userData

Continue
  -> scenes.findIndex + array adjacency
```

## Required results

```txt
ManifestAdmissionResult
  status: accepted | rejected | failed
  manifestId
  schemaVersion
  contentVersion
  fingerprint
  issues[]

SceneLookupResult
  status: resolved | unknown | stale | rejected
  sceneId
  manifestFingerprint
  sceneProjection?

HotspotLookupResult
  status: resolved | unknown | stale | rejected
  sceneId
  hotspotId
  manifestFingerprint
  hotspotProjection?

SuccessorLookupResult
  status: resolved | terminal | unknown | stale | rejected
  currentSceneId
  successorSceneId?
  manifestFingerprint
```

## Rules

- No interaction surface owns a full mutable descriptor.
- UI and render consumers receive canonical ids and immutable projections.
- Every lookup cites the active manifest fingerprint.
- Results from a retired manifest revision are rejected.
- Unknown ids are explicit and never silently converted into unrelated content.
