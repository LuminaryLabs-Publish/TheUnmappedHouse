# Architecture audit: renderer-provider central reconciliation DSK map

**Timestamp:** `2026-07-13T04-47-00-04-00`

## Summary

The current application treats Three.js availability as an implicit module-loader prerequisite. The missing DSK must turn provider resolution into a deterministic capability-admission transaction before StageKit or story boot.

## Plan ledger

**Goal:** separate renderer-provider acquisition and proof from story, picking, persistence and stage-resource lifecycle.

- [x] Map current module and construction ownership.
- [x] Identify the missing parent authority.
- [x] Preserve existing independent domains.
- [x] Define candidate kits and transaction boundaries.
- [ ] Implement the authority.

## Current ownership

```txt
index.html
  owns static shell and Loading projection

src/game.js
  owns story state, persistence, progression and StageKit construction

src/stage-kit.js
  owns remote Three.js import, renderer resources, picking, parallax and RAF

browser module loader
  implicitly owns provider acquisition and failure
```

## Required parent domain

```txt
the-unmapped-house-render-provider-admission-authority-domain
```

This domain coordinates:

```txt
provider policy and approved source classes
provider manifest, ID, generation and attempt identity
artifact version and content fingerprint
integrity and required API-contract admission
timeout, cancellation and fallback ordering
terminal RenderProviderResult
StageKit construction admission
provider-independent failure and retry projection
bounded observations and journal
first provider-backed visible-frame acknowledgement
```

## Candidate kits

```txt
render-provider-policy-kit
render-provider-id-kit
render-provider-generation-kit
render-provider-manifest-kit
render-provider-source-kit
render-provider-artifact-fingerprint-kit
render-provider-integrity-admission-kit
render-provider-version-admission-kit
render-provider-contract-probe-kit
render-provider-timeout-kit
render-provider-fallback-kit
render-provider-result-kit
renderer-boot-phase-kit
stage-construction-admission-kit
provider-failure-ui-kit
provider-observation-kit
provider-journal-kit
first-provider-frame-ack-kit
local-vendor-provider-fixture-kit
blocked-cdn-fixture-kit
provider-timeout-fixture-kit
integrity-mismatch-fixture-kit
api-contract-mismatch-fixture-kit
browser-provider-smoke-kit
pages-provider-smoke-kit
```

## Required separation

Do not absorb hotspot picking, story progression, save convergence, modal focus or stage-resource retirement. Those domains consume an accepted provider capability and cite its generation, but retain their own commands, results and invariants.