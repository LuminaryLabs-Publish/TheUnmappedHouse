# Known gaps: The Unmapped House renderer-provider admission

**Timestamp:** `2026-07-13T04-29-43-04-00`

## Summary

The newest documented gap is renderer-provider admission. The browser resolves a remote Three.js module before application code runs, but the repository owns no immutable provider artifact, integrity result, contract probe, fallback transaction or provider-independent visible failure state.

## Plan ledger

**Goal:** eliminate indefinite or unproven renderer boot by making provider source, content, compatibility, failure and visibility explicit.

- [x] Trace the static module graph and provider boundary.
- [x] Inspect package and Pages proof surfaces.
- [x] Identify missing identities, results and fixtures.
- [x] Define candidate authority kits and completion criteria.
- [ ] Implement and execute the authority.

## Provider identity gaps

```txt
provider policy revision: absent
provider manifest version: absent
provider ID: absent
provider generation: absent
provider attempt ID: absent
source class: implicit remote URL
repository-owned artifact: absent
approved fallback list: absent
```

## Integrity and compatibility gaps

```txt
expected content fingerprint: absent
observed fingerprint: absent
integrity admission result: absent
version admission result: absent
module-evaluation result: browser-owned only
required export list: absent
required capability probe: absent
API contract result: absent
```

## Lifecycle and result gaps

```txt
renderer boot phase: absent
bounded timeout: absent
cancellation command/result: absent
retry command/result: absent
late predecessor rejection: absent
duplicate retry rejection: absent
stage-construction admission: absent
typed RenderProviderResult: absent
```

## Presentation gaps

```txt
provider-independent failure UI: absent
specific rejection reason projection: absent
retry/recovery affordance: absent
provider ID/version in diagnostics: absent
provider fingerprint in diagnostics: absent
first provider-backed frame acknowledgement: absent
first visible provider-failure frame acknowledgement: absent
```

## Validation and deployment gaps

```txt
provider manifest check: absent
build-artifact provider fingerprint check: absent
browser provider boot smoke: absent
blocked-provider fixture: absent
timeout fixture: absent
integrity-mismatch fixture: absent
version-mismatch fixture: absent
API-contract-mismatch fixture: absent
fallback fixture: absent
late-attempt fixture: absent
Pages provider smoke: absent
cache-disabled deployed navigation: absent
```

## Reachable visible failure

```txt
remote module request fails or is rejected
  -> StageKit module does not evaluate
  -> game.js body does not run
  -> story state and UI are not initialized
  -> no canvas is created
  -> static Loading title can remain
  -> no game-owned reason or recovery result exists
```

This path is inferred from static ES-module semantics and source ordering. It is not evidence of a current unpkg outage or malicious artifact.

## Retained independent gaps

```txt
hotspot input and picking authority
browser save commit/reset convergence
story manifest and snapshot admission
scene progression and interlude authority
stage resource lifecycle and runtime stop
modal focus and Continue admission
Notebook channel classification
committed-frame diagnostics
```

## Completion boundary

Do not claim provider reliability because the version-bearing URL loads in one browser session. Completion requires approved artifact identity, deterministic fingerprint admission, required API-contract proof, typed timeout/failure/fallback behavior, provider-independent recovery UI, exactly-once StageKit construction and local/build/Pages visible-frame fixtures.