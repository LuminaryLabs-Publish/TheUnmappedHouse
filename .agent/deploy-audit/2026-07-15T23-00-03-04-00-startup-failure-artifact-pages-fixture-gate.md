# Deploy audit: startup failure source, artifact, and Pages fixture gate

**Timestamp:** `2026-07-15T23-00-03-04-00`

## Summary

Syntax checks do not prove that the public module graph, external Three.js provider, WebGL context, shaders, render target, first-scene construction, fallback UI, retry path, or first frame works in the deployed environment.

## Plan ledger

**Goal:** require reproducible startup success and failure evidence for source, production artifact, and Pages.

- [x] Identify current proof limits.
- [x] Define failure-injection matrix.
- [x] Define required artifacts and acknowledgements.
- [ ] Implement and run the matrix.

## Current proof surface

```txt
npm run check
  -> node --check four local modules
  -> no external module fetch
  -> no browser module graph
  -> no WebGL
  -> no shader compilation
  -> no first frame
  -> no failure or retry projection
```

## Required fixture matrix

| Fixture | Expected result |
|---|---|
| normal source startup | ready UI and first presented story frame |
| Three.js request rejected | module/provider failure fallback and Retry |
| CSP/provider policy rejection | stable provider-policy result |
| WebGL unavailable | unsupported graphics fallback |
| renderer/context construction throws | stage-construction failure result |
| shader/program failure | render preparation failure result |
| render-target allocation failure | render preparation failure result |
| malformed first-scene descriptor | scene-preparation failure without partial adoption |
| first RAF suppressed | first-frame timeout result |
| retry after recoverable failure | new attempt reaches ready frame |
| old attempt resolves after retry | stale result rejected |
| pagehide during startup | attempt and resources retired |

Run each applicable fixture against:

```txt
local source server
production artifact
GitHub Pages URL
```

## Required evidence

```txt
startup attempt and result log
DOM accessibility snapshot
fallback screenshot
ready-frame screenshot
provider URL and resolved version
WebGL capability snapshot
first-ready and first-frame acknowledgement IDs
artifact hash and file inventory
Pages commit/ref correlation
```

## Readiness boundary

No public-startup or production-readiness claim is permitted until normal startup, failure projection, retry, stale-attempt rejection, and first-frame evidence agree across source, artifact, and Pages.