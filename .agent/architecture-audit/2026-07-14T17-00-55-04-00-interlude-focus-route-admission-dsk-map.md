# Architecture audit: interlude focus and route admission DSK map

**Timestamp:** `2026-07-14T17-00-55-04-00`  
**Status:** `audited`

## Summary

Visual interlude state, semantic modal state, keyboard focus, background command admission and route progression are currently independent side effects. The architecture needs one parent authority that settles them together.

## Plan ledger

**Goal:** define the smallest coordinating domain without replacing story, renderer, save or viewport ownership.

- [x] Preserve all 24 implemented kit boundaries.
- [x] Identify the missing command, identity, candidate, result and proof surfaces.
- [x] Keep existing scene, interlude, save, rendering and page-lifecycle authorities independent.
- [ ] Implement the coordinating authority.

## Current composition

```txt
story-data-kit
  -> browser-story-runtime-kit
  -> clue-ledger-kit
  -> scene-route-kit
  -> interlude-timer-kit
  -> DOM class and aria-hidden mutation
  -> unguarded nextScene callback

static-page-shell-kit
  -> hidden Continue remains focusable
  -> background hotspot buttons remain focusable

stage-render-kit
  -> canvas remains visually active under the overlay
```

## Parent domain

```txt
the-unmapped-house-interlude-focus-route-admission-authority-domain
```

## Coordinating surfaces

```txt
interlude-command-envelope-kit
story-completion-evidence-kit
scene-route-revision-kit
interlude-generation-kit
focus-owner-kit
prior-focus-capture-kit
semantic-modal-candidate-kit
background-inertness-kit
interlude-open-admission-kit
interlude-continue-admission-kit
premature-route-rejection-kit
stale-command-rejection-kit
duplicate-command-rejection-kit
successor-scene-candidate-kit
focus-restoration-policy-kit
interlude-result-kit
route-settlement-receipt-kit
first-focus-stable-scene-frame-ack-kit
accessibility-diagnostics-kit
focus-route-fixture-matrix-kit
```

## Service contracts

```txt
InterludeOpenCommand
  inputs: scene revision, story revision, completion evidence, current focus owner
  outputs: semantic modal candidate, inert background candidate, InterludeOpenResult

InterludeContinueCommand
  inputs: active interlude generation, completed scene, expected route revision
  outputs: successor route candidate, focus target, InterludeContinueResult

FirstFocusStableSceneFrameAck
  binds: accepted route, scene, stage, interlude-closed and focus-owner revisions
```

## Retained ownership

```txt
story facts and completion: story-data/clue ledgers
scene construction: stage-render and descriptor consumer
persistence: localstorage-save
viewport: aspect-frame
page lifecycle: retained page-lifecycle authority
terminal outcome: retained terminal authority
```

No runtime architecture changed.