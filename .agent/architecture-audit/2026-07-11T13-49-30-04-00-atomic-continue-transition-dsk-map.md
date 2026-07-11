# Architecture audit: atomic Continue transition DSK map

Timestamp: `2026-07-11T13-49-30-04-00`

## Goal

Define one authority boundary that advances a completed scene only when proof, story, stage, persistence, projection, frame, and resource ownership can commit coherently.

## Current coupling

```txt
browser-story-runtime-kit
  -> completion predicate
  -> anonymous interlude timeout
  -> direct Continue callback
  -> mutable story route
  -> StageKit.loadScene live replacement
  -> DOM projection
  -> raw localStorage write

stage-render-kit
  -> clear active group
  -> incrementally build successor resources
  -> recursive RAF renders mutable live state
```

## Parent domain

```txt
the-unmapped-house-atomic-continue-transition-authority-domain
```

## Child kits

```txt
continue-command-envelope-kit
continue-admission-kit
completion-proof-consumption-kit
scene-transition-id-kit
scene-transition-plan-kit
successor-story-candidate-kit
detached-stage-preparation-kit
stage-preparation-result-kit
transition-persistence-kit
atomic-story-stage-commit-kit
transition-rollback-kit
stage-epoch-kit
predecessor-resource-retirement-kit
first-successor-frame-ack-kit
transition-result-kit
transition-journal-kit
continue-transition-fixture-kit
browser-transition-failure-smoke-kit
```

## Ownership rules

- StoryManifest owns canonical scene order and successor resolution.
- SceneCompletionProof owns Continue eligibility.
- Continue authority owns proof reservation, transition identity, admission, and exactly-once result.
- Detached stage preparation owns all candidate Three.js resources until commit.
- StorySnapshot persistence must succeed before live publication.
- Atomic commit advances story revision and stage epoch together.
- Frame authority acknowledges the first visible successor frame.
- Resource retirement disposes predecessor allocations only after frame acknowledgement.
- Any pre-commit failure preserves predecessor story, stage, DOM, and persistence.

## Dependency order

```txt
StoryManifest
  -> StorySnapshot persistence
  -> inspection receipts and completion proof
  -> atomic Continue transition
  -> runtime lifecycle
  -> committed-frame diagnostics
```