# Architecture audit: Scene Progression and Interlude DSK Map

**Timestamp:** `2026-07-12T20-51-16-04-00`

## Summary

Story facts, timer scheduling, DOM visibility, focus and route mutation currently share `src/game.js` without an explicit progression aggregate or command boundary.

## Plan ledger

**Goal:** separate authored story meaning from progression-phase authority and browser presentation details.

- [x] Map current composition.
- [x] Define the missing parent domain.
- [x] Define candidate kits and ownership rules.
- [ ] Implement and fixture the domain.

## Current composition

```txt
browser-story-runtime-kit
  -> inspection-ledger-kit
  -> clue-ledger-kit
  -> scene-route-kit
  -> interlude-timer-kit
  -> terminal-route-kit
  -> localstorage-save-kit
  -> DOM classes and focus behavior
  -> StageKit.loadScene()
```

## Missing parent domain

```txt
the-unmapped-house-scene-progression-interlude-authority-domain
```

### Identity and state

```txt
story-run-id-kit
story-run-generation-kit
scene-phase-kit
scene-revision-kit
route-revision-kit
persisted-progression-phase-kit
startup-phase-reconciliation-kit
```

### Completion and timer ownership

```txt
completion-candidate-kit
completion-result-kit
completion-timer-lease-kit
stale-completion-callback-rejection-kit
interlude-open-command-kit
interlude-open-result-kit
```

### Continue and transition

```txt
continue-command-kit
continue-admission-kit
exact-once-scene-advance-kit
scene-transition-result-kit
terminal-outcome-kit
```

### Focus and interaction context

```txt
interlude-focus-lease-kit
modal-inertness-kit
gameplay-input-context-kit
```

### Observation and proof

```txt
first-visible-interlude-frame-ack-kit
first-visible-successor-frame-ack-kit
progression-observation-kit
progression-journal-kit
keyboard-hidden-control-fixture-kit
reload-after-completion-fixture-kit
stale-timer-transition-fixture-kit
browser-progression-smoke-kit
pages-progression-smoke-kit
```

## Boundary rules

```txt
story-data owns authored scene order and requirements
progression authority owns phase, revisions and transition admission
browser host owns timer and focus mechanisms behind leases
DOM projection cannot create authority
StageKit consumes only an accepted scene-transition result
no hidden control can mutate progression
no callback can act without matching run/scene generations
no scene advances twice for one predecessor revision
no completed scene reload loses its continuation path
no visible interlude/successor frame lacks committed phase provenance
```
