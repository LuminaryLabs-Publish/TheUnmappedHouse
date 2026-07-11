# Deploy audit: Continue transition fixture gate

Timestamp: `2026-07-11T10-12-03-04-00`

## Goal

Prevent deployment of a scene-transition implementation that can partially advance story state, leak stage resources or report success before the replacement scene is visible.

## Current validation surface

```txt
npm run check
  -> node --check src/aspect-frame.js
  -> node --check src/game.js
  -> node --check src/stage-kit.js
  -> node --check src/story-data.js
```

This proves syntax only.

## Required Node gate

```txt
node scripts/validate-story-manifest.mjs
node scripts/validate-save-admission.mjs
node scripts/validate-inspection-authority.mjs
node scripts/validate-continue-transition.mjs
node scripts/validate-stage-resource-disposal.mjs
node scripts/validate-first-frame-ack.mjs
```

## Required browser gate

```txt
start with no save
complete scene one
observe one interlude after 450 ms
Continue to scene two
verify target title, hotspot list and rendered stage
verify first-frame receipt
verify scene-one resources retired
repeat through scene three
commit terminal state
repeat terminal Continue and verify no-op
reset and verify listener/timeout/RAF/resource retirement
```

## Failure injection matrix

```txt
invalid target descriptor
layer geometry constructor failure
prop geometry constructor failure
hotspot construction failure
localStorage serialization failure
localStorage quota/security failure
stage swap failure
first-frame timeout
resource disposal failure
```

Each row must produce a typed result and a deterministic committed-state outcome.

## Pages gate

Before publishing from `main`, require:

```txt
syntax checks
manifest and persistence fixtures
inspection authority fixtures
Continue transaction fixtures
resource disposal fixtures
first-frame fixtures
browser transition smoke
```

## Current status

```txt
fixture gate: planned
runtime implementation: absent
current Pages behavior: unchanged by this audit
```
