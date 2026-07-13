# Next steps: The Unmapped House renderer-provider admission

**Timestamp:** `2026-07-13T04-29-43-04-00`

## Summary

The next implementation should move Three.js from an implicit remote module prerequisite into an approved provider artifact and typed boot transaction. Build provider-independent failure projection first, then gate StageKit and story startup on one accepted provider result.

## Plan ledger

**Goal:** achieve deterministic provider identity, bounded failure behavior and first-frame provenance without changing story semantics.

- [ ] Choose the production provider policy and approved source classes.
- [ ] Prefer a repository-owned or build-vendored Three.js artifact.
- [ ] Add immutable provider manifest, version and content fingerprint.
- [ ] Add provider attempt, result and boot-phase identities.
- [ ] Verify required Three.js API contract before StageKit construction.
- [ ] Add timeout, cancellation and approved fallback policy.
- [ ] Add provider-independent visible failure and retry surface.
- [ ] Gate StageKit and story boot on `Accepted` or `FallbackAccepted`.
- [ ] Reject late, stale and duplicate provider results.
- [ ] Correlate accepted provider and stage generation with the first visible frame.
- [ ] Add source, build, browser and Pages fixture matrices.

## Ordered implementation

### 1. Establish provider policy

Document whether production permits:

```txt
repository-vendored artifact
same-origin build artifact
pinned remote fallback
no remote fallback
```

Do not accept arbitrary runtime URLs.

### 2. Create `RenderProviderManifest`

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

### 3. Own the artifact

Prefer vendoring or producing the exact Three.js ES module during a deterministic build. Verify the output fingerprint against the manifest.

### 4. Add provider-independent bootstrap

A small same-origin bootstrap must own:

```txt
ResolvingProvider
ProviderAccepted
ProviderRejected
ProviderTimedOut
Retrying
StageReady
```

It must remain functional when Three.js cannot load.

### 5. Add typed commands and results

```txt
RenderProviderBootCommand
RetryProviderCommand
CancelProviderCommand
RenderProviderResult
StageConstructionResult
```

Terminal provider statuses:

```txt
Accepted
FallbackAccepted
Unavailable
TimedOut
IntegrityRejected
VersionRejected
ContractRejected
Cancelled
Duplicate
Stale
```

### 6. Probe the required API

Validate every constructor and constant currently used by StageKit before allocating renderer resources.

### 7. Gate stage and story boot

Only accepted results may create a StageKit. Non-accepted results must create no story runtime generation and must not persist story state.

### 8. Add exactly-once and stale-result policy

Retries allocate new provider-attempt generations. A late predecessor result cannot construct or replace a stage.

### 9. Add visible-frame receipts

Record provider ID, generation, version, fingerprint, stage generation and frame sequence for the first accepted visible frame.

### 10. Execute fixture matrix

```txt
local vendored provider accepted
remote primary blocked
provider timeout
integrity mismatch
version mismatch
API contract mismatch
approved fallback accepted
all candidates exhausted
retry double-click
late predecessor success
page retirement during attempt
fresh Pages navigation
cache-disabled Pages navigation
```

## Do not combine yet

Keep hotspot picking, persistence convergence, interlude progression, modal focus and stage resource retirement as separate authorities. Renderer-provider admission supplies a verified capability and boot result; it does not own those domain rules.