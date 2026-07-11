# Architecture audit: story phase recovery DSK map

Timestamp: `2026-07-11T01-38-28-04-00`

## Current ownership

```txt
story-data-kit
  -> authored scenes, hotspots, requirements and interlude copy

browser-story-runtime-kit
  -> mutable state
  -> implicit phase
  -> inspection and completion
  -> setTimeout
  -> Continue
  -> localStorage effects
  -> DOM projection
  -> StageKit calls

stage-render-kit
  -> live Three.js scene
  -> picking
  -> recursive RAF
  -> direct scene replacement
```

## Architectural defect

One module owns story rules, browser effects, persistence, phase timing, DOM projection and stage transitions. There is no stable contract between:

```txt
completion evidence
  -> committed story phase
  -> timer effect
  -> interlude projection
  -> Continue admission
  -> durable transition
  -> stage commit
  -> terminal state
```

## Proposed parent domain

```txt
story-session-domain
```

Owns only serializable coordination state:

```txt
sessionId
runtimeEpoch
storyManifestId
sourceFingerprint
saveRevision
stateFingerprint
sceneId
storyPhase
completionProof
pendingInterlude
pendingTransition
terminalState
lastCommandResult
lastStageCommit
```

## Proposed DSK split

```txt
story-source-domain
  story-source-schema-kit
  story-manifest-kit
  story-source-fingerprint-kit

story-snapshot-domain
  versioned-save-envelope-kit
  save-shape-validator-kit
  save-reconciliation-kit
  story-state-fingerprint-kit

story-phase-domain
  story-phase-state-machine-kit
  scene-completion-proof-kit
  phase-reconciliation-kit
  terminal-story-state-kit

interlude-domain
  interlude-deadline-kit
  interlude-timer-adapter-kit
  interlude-resume-kit
  stale-timer-rejection-kit

story-command-domain
  inspect-command-kit
  continue-command-kit
  reset-command-kit
  story-command-admission-kit
  story-command-result-kit

persistence-domain
  persistence-capability-kit
  persistence-load-result-kit
  persistence-write-result-kit
  persistence-clear-result-kit
  story-persistence-commit-protocol-kit

story-stage-domain
  story-transition-transaction-kit
  stage-build-plan-kit
  stage-resource-ledger-kit
  atomic-stage-commit-kit
  stage-commit-result-kit
  stage-epoch-kit

observation-domain
  phase-projection-kit
  phase-stage-correlation-kit
  story-phase-journal-kit
  debug-observation-kit

lifecycle-domain
  runtime-session-lifecycle-kit
  timer-lifecycle-kit
  frame-loop-lifecycle-kit
  event-listener-lifecycle-kit
  stage-disposal-kit

validation-domain
  story-phase-fixture-kit
  interlude-timer-fixture-kit
  continue-admission-fixture-kit
  terminal-reload-fixture-kit
  browser-phase-reload-smoke-kit
```

## Required contracts

### Phase reducer

```txt
reduceStory(snapshot, command, now)
  -> { nextSnapshot, effects, result }
```

The reducer must be pure and return no DOM nodes, timers, storage objects or Three.js resources.

### Timer effect

```txt
{
  effect: "schedule-interlude",
  targetSceneId,
  readyAt,
  expectedSaveRevision,
  runtimeEpoch
}
```

### Continue admission

```txt
accepted only when:
  phase == interlude_open
  expectedSceneId == snapshot.sceneId
  expectedSaveRevision == snapshot.saveRevision
  completionProof is valid
```

### Transition transaction

```txt
prepare next story snapshot
  -> persist pending transition
  -> prepare stage resources
  -> commit stage
  -> finalize save revision
  -> publish committed projection
```

## Ownership boundary

```txt
story rules own next serializable snapshot
persistence owns durable revision outcomes
interlude adapter owns timer handles only
StageKit owns renderer resources only
projection owns DOM reflection only
session owns correlation and lifecycle
```

## Dependency order

```txt
versioned snapshot
  -> phase reducer
  -> completion proof
  -> timer deadline and recovery
  -> Continue admission
  -> persistence transaction
  -> atomic stage commit
  -> terminal state
  -> observation and fixtures
```
