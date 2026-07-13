# Deploy audit: scene-transition fixture gate

**Timestamp:** `2026-07-13T09-03-20-04-00`

## Summary

The current syntax and Pages workflow do not exercise scene transitions or fault recovery. Deployment success cannot prove story-stage-UI-save coherence.

## Plan ledger

**Goal:** make scene-transition correctness a release gate without changing the current deployment workflow in this documentation pass.

- [x] Identify current proof boundary.
- [x] Define source, browser, build and Pages fixtures.
- [ ] Implement fixtures.
- [ ] Require passing evidence before readiness claims.

## Current proof

```txt
npm run check
  -> local JavaScript syntax only

Pages deploy
  -> upload repository root
  -> deploy static artifact
  -> no interaction or fault-injection smoke
```

## Required source fixtures

```txt
route validation
participant preparation
accepted aggregate commit
zero-mutation rejection
rollback restoration
stale and duplicate rejection
terminal scene handling
```

## Required browser fixtures

```txt
scene one to two visible parity
scene two to three visible parity
terminal completion
stage candidate failure
DOM candidate failure
storage rejection
reload after accepted transition
first successor frame acknowledgement
```

## Required built-output and Pages fixtures

```txt
fresh navigation
cache-disabled navigation
complete one scene and Continue
verify canvas and DOM scene IDs agree
verify durable save scene ID agrees
reload and verify same scene
capture transition result and frame acknowledgement
```

## Evidence packet

```txt
commit SHA
artifact fingerprint
deployment URL and timestamp
TransitionId
participant revisions and receipts
SceneTransitionResult
FirstSceneFrameAck
visible DOM/canvas readback
reload parity result
```

No deployment-readiness claim is made until these fixtures execute against the exact published artifact.