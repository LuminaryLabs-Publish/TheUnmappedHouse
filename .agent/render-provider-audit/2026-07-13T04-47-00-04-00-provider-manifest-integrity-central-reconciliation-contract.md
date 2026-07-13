# Renderer-provider audit: manifest and integrity reconciliation contract

**Timestamp:** `2026-07-13T04-47-00-04-00`

## Summary

The version-bearing unpkg URL names Three.js `0.160.0`, but the repository does not own or admit the provider artifact. A provider manifest must bind source policy, exact bytes, compatibility requirements and fallback order before evaluation can authorize StageKit construction.

## Plan ledger

**Goal:** make renderer-provider identity, provenance, compatibility and terminal outcomes machine-checkable.

- [x] Record the current remote source and named version.
- [x] Identify missing manifest and observed-artifact evidence.
- [x] Define immutable manifest fields.
- [x] Define terminal admission results.
- [x] Define fallback and exactly-once obligations.
- [ ] Implement artifact ownership and verification.

## Required manifest

```txt
manifestVersion
providerId
packageName
expectedVersion
sourceClass
approvedLocations
expectedContentFingerprint
requiredExports
requiredCapabilities
timeoutMs
fallbackOrder
policyRevision
```

## Admission order

```txt
source-policy admission
  -> version admission
  -> content-fingerprint admission
  -> module evaluation
  -> required API-contract probe
  -> terminal RenderProviderResult
```

## Invariants

```txt
arbitrary runtime URLs are rejected
only authored fallback candidates are attempted
one attempt returns one terminal result
late and duplicate results cannot construct a stage
non-accepted results allocate no persistent renderer resources
accepted result evidence survives into first-frame diagnostics
bounded logs do not expose uncontrolled module or network data
```

## Preferred source policy

Prefer a repository-owned or deterministic build-vendored Three.js module. A pinned remote source may only exist as an explicitly approved fallback with a separate expected fingerprint and the same API-contract probe.