# Deploy audit: renderer-provider Pages fixture gate

**Timestamp:** `2026-07-13T04-29-43-04-00`

## Summary

The current Pages workflow uploads the repository root without resolving or verifying the external Three.js provider. Local syntax validation cannot prove remote artifact availability, integrity, contract compatibility or provider-backed visible rendering.

## Plan ledger

**Goal:** require source, build-artifact and deployed-origin proof for both accepted and rejected provider paths.

- [x] Inspect package validation and Pages workflow.
- [x] Identify provider checks absent from both paths.
- [x] Define source/build/Pages fixture rows.
- [x] Define blocking completion criteria.
- [ ] Implement the build artifact and execute the matrix.

## Current proof boundary

```txt
npm run check
  -> Node syntax-checks four local JavaScript files
  -> does not resolve the browser module graph
  -> does not fetch or verify Three.js
  -> does not start WebGL

Pages workflow
  -> checkout
  -> configure Pages
  -> upload repository root
  -> deploy artifact
  -> does not vendor, fingerprint or smoke-test provider
```

## Required source gate

```txt
provider manifest exists
approved source classes are explicit
version and content fingerprint are pinned
required API contract is declared
provider-independent failure UI exists
raw production boot does not depend on an unverified arbitrary URL
```

## Required build gate

```txt
approved provider artifact is present in output
artifact fingerprint matches manifest
module graph resolves from output origin
provider contract probe passes
no unexpected remote provider origins remain
boot result and failure projection survive minification/copy
```

## Required browser matrix

```txt
primary accepted
primary unavailable
primary timeout
integrity mismatch
version mismatch
API contract mismatch
approved fallback accepted
all candidates exhausted
retry after failure
late predecessor completion
duplicate retry
page retirement during attempt
first provider-backed frame acknowledgement
first visible failure-frame acknowledgement
```

## Required Pages matrix

```txt
fresh deployed navigation
cache-disabled navigation
approved provider artifact fetch
blocked external network simulation
fallback policy parity
visible failure and retry projection
provider/stage/frame provenance readback
```

## Blocking rule

Do not claim production provider reliability because the pinned URL loads during one manual visit. Completion requires deterministic artifact identity, typed failure behavior, bounded fallback and deployed-origin visible-frame proof.

## Validation boundary

No package script, dependency, build step or workflow was changed. No local or Pages provider fixture was run.