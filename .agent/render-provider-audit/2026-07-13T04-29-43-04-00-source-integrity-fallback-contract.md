# Render-provider audit: source, integrity and fallback contract

**Timestamp:** `2026-07-13T04-29-43-04-00`

## Summary

The current provider URL identifies a package version but does not establish repository-controlled bytes, content integrity, a verified API contract or a bounded fallback path. This contract makes provider identity more specific than a URL string and prevents arbitrary fallback sources from becoming runtime capabilities.

## Plan ledger

**Goal:** admit only approved renderer artifacts whose source, content and required API contract match one immutable manifest.

- [x] Separate URL, version, artifact fingerprint and API contract identity.
- [x] Define primary and fallback admission rules.
- [x] Define terminal rejection states.
- [x] Define exactly-once provider and stage generations.
- [ ] Vendor or build the artifact and execute integrity/fallback fixtures.

## Provider manifest

```txt
RenderProviderManifest {
  manifestVersion
  providerId
  packageName
  expectedVersion
  sourceClass
  approvedLocations[]
  expectedContentFingerprint
  requiredExports[]
  requiredCapabilities[]
  timeoutMs
  fallbackOrder[]
  policyRevision
}
```

## Source policy

Preferred order:

```txt
1. repository-owned vendored or build artifact
2. explicitly approved same-origin artifact
3. explicitly approved pinned remote fallback, when production policy permits
```

An arbitrary query parameter, console-supplied URL or dynamically discovered mirror is not an approved fallback.

## Integrity admission

```txt
resolve candidate
  -> bind manifest and provider generation
  -> obtain bytes or verifiable artifact identity
  -> calculate/validate content fingerprint
  -> evaluate as an ES module
  -> compare exported version when available
  -> probe required API contract
  -> publish terminal result
```

A version-bearing URL is not equivalent to a content fingerprint. TLS and package naming do not establish that the bytes match the repository's admitted artifact.

## Required Three.js contract

The current StageKit requires at least:

```txt
Clock
Vector2
Vector3
Color
WebGLRenderer
Scene
Group
PerspectiveCamera
OrthographicCamera
Raycaster
DirectionalLight
HemisphereLight
WebGLRenderTarget
ShaderMaterial
Mesh
PlaneGeometry
BoxGeometry
CylinderGeometry
MeshBasicMaterial
FogExp2
PCFSoftShadowMap
```

The contract probe should validate required constructors/constants before allocating stage resources.

## Fallback rules

```txt
primary unavailable or timed out
  -> evaluate next approved candidate

primary integrity/version/contract rejected
  -> fallback only when policy explicitly permits that rejection class

fallback accepted
  -> publish FallbackAccepted with depth and predecessor evidence

all candidates exhausted
  -> publish one terminal non-accepted result
```

Late results from superseded attempts cannot construct a stage.

## Retirement

Provider capabilities and stage generations must be revoked on runtime retirement. A retry allocates a new provider attempt generation and does not reuse mutable partial stage state.

## Validation boundary

No provider was downloaded, fingerprinted, blocked or substituted. This file specifies future admission behavior only.