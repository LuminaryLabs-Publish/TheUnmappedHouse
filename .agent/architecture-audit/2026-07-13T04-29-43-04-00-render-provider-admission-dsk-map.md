# Architecture audit: renderer-provider admission DSK map

**Timestamp:** `2026-07-13T04-29-43-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

## Summary

The stage renderer currently treats a remote ES-module import as an implicit prerequisite rather than a domain result. This audit defines a parent authority that resolves, verifies and admits a renderer provider before StageKit construction or story boot.

## Plan ledger

**Goal:** separate provider acquisition and verification from stage construction while preserving the existing story and rendering kits as consumers.

- [x] Identify the provider boundary before `StageKit` evaluation.
- [x] Separate provider policy, artifact identity, integrity, API contract and boot results.
- [x] Define fallback, failure projection and visible-frame proof.
- [x] Keep story, hotspot, persistence and stage-lifecycle authorities independent.
- [ ] Implement the DSK and fixture matrix.

## Parent domain

```txt
the-unmapped-house-render-provider-admission-authority-domain
```

## Composition

```txt
render-provider-policy-kit
  decides approved source classes, versions, fallback order and production policy

render-provider-id-kit
render-provider-generation-kit
render-provider-manifest-kit
  identify the candidate and immutable expected metadata

render-provider-source-kit
render-provider-artifact-fingerprint-kit
render-provider-integrity-admission-kit
render-provider-version-admission-kit
  resolve source bytes and admit version/provenance

render-provider-contract-probe-kit
  verifies required THREE exports and runtime behavior before stage construction

render-provider-timeout-kit
render-provider-fallback-kit
  bound acquisition and select only approved successors

render-provider-result-kit
renderer-boot-phase-kit
stage-construction-admission-kit
  publish one terminal result and gate StageKit creation

provider-failure-ui-kit
provider-observation-kit
provider-journal-kit
first-provider-frame-ack-kit
  project bounded failure/recovery state and correlate accepted provider with visibility

local-vendor-provider-fixture-kit
blocked-cdn-fixture-kit
provider-timeout-fixture-kit
integrity-mismatch-fixture-kit
api-contract-mismatch-fixture-kit
browser-provider-smoke-kit
pages-provider-smoke-kit
  prove source, build and deployed behavior
```

## Ownership boundary

The parent domain owns:

```txt
provider policy revision
provider candidate identity and generation
expected version and fingerprint
source class and provenance
fetch/evaluation timeout
integrity and API-contract admission
fallback selection
boot phase and terminal result
provider observations and journal
first provider-backed frame acknowledgement
```

It does not own:

```txt
story descriptors or progression
hotspot selection
localStorage semantics
Three.js scene construction after admission
stage resource disposal after construction
camera parallax
post-processing policy
```

## Required transaction

```txt
RenderProviderBootCommand
  -> bind runtime/build/deploy/provider-policy generations
  -> resolve approved candidate
  -> verify source, version and fingerprint
  -> evaluate module under timeout/cancellation policy
  -> probe required API contract
  -> select accepted primary or approved fallback
  -> publish terminal RenderProviderResult
  -> gate StageKit construction
  -> publish provider-backed visible-frame acknowledgement
```

## Result vocabulary

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

Every non-accepted result performs zero stage construction and must be visible through a static bootstrap surface that does not depend on the rejected provider.

## Integration map

```txt
static-page-shell-kit
  -> renders boot/failure surface without Three.js

render-provider admission authority
  -> returns accepted provider capability

stage-render-kit
  -> consumes accepted capability
  -> constructs WebGL stage

browser-story-runtime-kit
  -> begins story boot only after stage admission

repo-local and central ledgers
  -> record policy and proof boundaries, not live provider availability
```

## Completion criteria

- Production boot uses an approved, fingerprinted provider artifact.
- Provider failure returns a typed result instead of leaving an indefinite `Loading` state.
- Fallback is bounded, ordered and provenance-checked.
- StageKit is constructed at most once per accepted provider generation.
- A visible frame records the provider ID, generation and fingerprint.
- Local, build and Pages fixture matrices pass.