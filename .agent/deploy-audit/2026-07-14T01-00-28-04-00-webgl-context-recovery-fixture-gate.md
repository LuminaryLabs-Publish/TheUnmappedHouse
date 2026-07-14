# Deploy audit: WebGL context-recovery fixture gate

**Timestamp:** `2026-07-14T01-00-28-04-00`  
**Status:** `audited`

## Summary

The current package check is syntax-only. The deployment pipeline has no executable browser gate proving context-loss fallback, interaction suspension, complete stage reconstruction, first recovered-frame evidence or parity on the built and deployed origins.

## Plan ledger

**Goal:** require recovery behavior to pass the same matrix in source, production artifact and GitHub Pages before production readiness is claimed.

- [x] Inspect package validation scope.
- [x] Identify browser-only recovery behavior.
- [x] Define fixture identities and required assertions.
- [x] Define source/build/Pages parity.
- [ ] Add and execute the fixture gate.

## Current proof

```txt
npm run check
  -> node --check src/aspect-frame.js
  -> node --check src/game.js
  -> node --check src/stage-kit.js
  -> node --check src/story-data.js
```

This proves parseable JavaScript only.

## Required browser harness

Use a real browser and the WebGL lose-context extension when available:

```txt
WEBGL_lose_context.loseContext()
  -> observe accepted loss result
  -> observe fallback visible
  -> observe interaction lease suspended

WEBGL_lose_context.restoreContext()
  -> observe recovery attempt
  -> observe participant receipts
  -> observe probe pass or typed failure
  -> observe first recovered stage frame
  -> observe fallback retirement
  -> observe interaction lease active
```

Where the extension is unavailable, the fixture must report `Unsupported` rather than pass silently.

## Required fixture matrix

```txt
loss before first frame
loss after first frame
loss in every authored scene
loss during interlude
loss during resize
loss after DPR change
loss while pointer hovers a hotspot
DOM and canvas command attempts during loss
repeated loss event
stale restoration event
shader preparation failure
render-target allocation failure
geometry preparation failure
probe failure
successful recovery
failed recovery with stable fallback
bounded retry
pagehide during recovery
reload fallback
```

## Required assertions

```txt
one accepted loss per context generation
one active render-submission lease
fallback visible before unsafe interaction resumes
story truth unchanged by presentation failure
no scene-dependent command settles during suspension
all successor resources share one generation
failed candidates are disposed
first recovered frame matches current scene and viewport
fallback retires only after acknowledgement
no stale predecessor callback submits after adoption
```

## Parity gate

Run the same externally observable assertions against:

```txt
source served locally
production/static artifact
GitHub Pages deployment
```

Record origin, commit SHA, artifact fingerprint, browser version, GPU/backend details, context generation, stage generation and captured frame evidence.

## Completion boundary

Do not claim Pages recovery because the source fixture passes. Deployment readiness requires the production artifact and deployed origin to produce the same typed results and recovered-frame evidence.