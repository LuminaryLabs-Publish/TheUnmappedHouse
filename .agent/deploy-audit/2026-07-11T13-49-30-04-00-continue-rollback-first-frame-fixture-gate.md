# Deploy audit: Continue rollback and first-frame fixture gate

Timestamp: `2026-07-11T13-49-30-04-00`

## Goal

Prevent deployment from claiming reliable Continue behavior until deterministic Node fixtures and a browser failure smoke prove atomic transition semantics.

## Required gate

```txt
manifest and snapshot admission fixtures
inspection and completion-proof fixtures
Continue admission fixtures
successor detached-preparation fixtures
prepare-failure cleanup fixtures
persistence-failure rollback fixtures
atomic commit and duplicate Continue fixtures
terminal-phase persistence fixture
first-successor-frame correlation fixture
predecessor retirement-after-ack fixture
browser failure-injection smoke
npm run check
```

## Blocking rows

```txt
predecessor-remains-visible-on-prepare-failure
predecessor-remains-persisted-on-save-failure
partial-successor-resources-disposed
double-continue-does-not-skip-scene
story-revision-and-stage-epoch-commit-together
first-frame-matches-transition
predecessor-retirement-follows-frame-ack
terminal-phase-survives-reload
```

## Current state

The repository has syntax-only checks. No executable transition, rollback, frame, or resource-retirement fixture exists. This documentation pass changes no deployment workflow.