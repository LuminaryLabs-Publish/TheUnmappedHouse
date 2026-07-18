# Deploy audit: render-frame allocation browser fixture gate

**Timestamp:** `2026-07-18T09-40-39-04-00`  
**Status:** `proof-required`

## Current deployment

```txt
push to main
  -> checkout
  -> configure Pages
  -> upload repository root
  -> deploy static artifact
```

The workflow runs no syntax check, browser fixture, heap observation, frame-allocation fixture, artifact inspection or deployed-origin smoke before publication.

## Required gate

```txt
npm run check
  -> source browser fixture
  -> stable RAF callback identity proof
  -> reusable camera scratch proof
  -> pointer-parallax equivalence proof
  -> scene-transition scratch retirement proof
  -> hidden/resume generation proof
  -> production artifact smoke
  -> Pages-origin smoke
  -> matching RenderFrameWorkDigest
  -> FirstFrameWorkBoundPresentationAck
```

## Evidence requirements

- Record browser name/version, viewport, DPR and frame count.
- Distinguish source-owned construction counters from browser/provider heap observations.
- Preserve raw fixture output and accepted policy revision.
- Compare source, uploaded artifact and deployed origin.
- Do not infer a performance improvement from source cleanup alone.

## Current proof state

```txt
npm run check: not run
steady-state allocation fixture: unavailable
camera parallax scratch fixture: unavailable
hidden/resume fixture: unavailable
browser heap observation: unavailable
artifact smoke: not run
Pages smoke: not run
```

No deployment, performance or production-readiness claim is made.