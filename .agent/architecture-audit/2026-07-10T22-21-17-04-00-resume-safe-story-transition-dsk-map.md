# Architecture audit: resume-safe story transition DSK map

Timestamp: `2026-07-10T22-21-17-04-00`

## Current composition

```txt
static-page-shell-kit
  -> aspect-frame-kit
  -> browser-story-runtime-kit
       -> story-data-kit
       -> localstorage-save-kit
       -> inspection-ledger-kit
       -> clue-ledger-kit
       -> notebook-log-kit
       -> scene-route-kit
       -> interlude-timer-kit
       -> terminal-route-kit
       -> debug-json-projection-kit
       -> stage-render-kit
            -> scene-descriptor-consumer-kit
            -> anime-material-kit
            -> hotspot-volume-kit
            -> hotspot-picking-kit
            -> camera-parallax-kit
            -> render-target-composition-kit
            -> post-process-kit
```

## Current authority problem

`browser-story-runtime-kit` is not a narrow composition layer. It owns source lookup, save parsing, mutable state, commands, completion, timer scheduling, scene progression, terminal projection, DOM rendering and direct StageKit calls.

The current path is:

```txt
hotspot descriptor object
  -> direct inspect mutation
  -> completion from global clue strings
  -> save completed state
  -> unretained browser timer
  -> DOM-only interlude
  -> direct Continue mutation
  -> direct StageKit load
  -> save after stage mutation
```

No immutable boundary identifies which source, save, phase, command, result or stage commit produced the visible state.

## Required domain split

```txt
story-source-domain
  story-source-schema-kit
  story-manifest-kit
  story-source-fingerprint-kit
  story-graph-validator-kit

story-persistence-domain
  versioned-save-envelope-kit
  save-shape-validator-kit
  save-reconciliation-kit

story-state-domain
  scene-clue-derivation-kit
  completion-proof-kit
  story-phase-state-machine-kit
  terminal-state-kit
  story-state-fingerprint-kit

story-command-domain
  story-command-kit
  story-command-admission-kit
  story-command-result-kit
  story-journal-kit

story-presentation-domain
  interlude-readiness-kit
  resume-projection-kit

story-transition-domain
  story-transition-transaction-kit
  story-stage-transition-adapter-kit

story-proof-domain
  headless-resume-fixture-kit
  browser-route-resume-smoke-kit
```

## Intended command path

```txt
input adapter
  -> canonical StoryCommand
  -> source/phase/expected-state admission
  -> pure StoryReducer
  -> StoryCommandResult
  -> optional prepared StoryTransition
  -> StageCommitResult adapter
  -> committed StoryStageObservation
  -> save envelope write
  -> DOM/debug projection
```

## StorySnapshot contract

```txt
schemaVersion
manifestId
sourceFingerprint
sceneId
storyPhase
inspectedByScene
completionProofByScene
route
notebookLog
pendingInterlude
terminalState
stateRevision
stateFingerprint
```

Clues should be derived from canonical inspection evidence or retained only as validated projections. Persisted global clue strings must not be the sole completion authority.

## StoryCommand contract

```txt
requestId
kind: inspect_hotspot | continue_story | reset_story
sceneId
hotspotId?
expectedPhase
expectedStateRevision
sourceFingerprint
issuedAt
```

## StoryCommandResult contract

```txt
requestId
status: accepted | rejected | failed | no_op
reason
commandKind
sceneIdBefore
sceneIdAfter
phaseBefore
phaseAfter
stateRevisionBefore
stateRevisionAfter
stateFingerprintBefore
stateFingerprintAfter
completionProof?
transitionRequest?
```

## StoryStageTransition contract

```txt
transitionId
requestId
sourceFingerprint
previousStoryObservation
preparedStoryObservation
requestedStageSceneId
stageCommitResult
committedStoryObservation
saveWriteResult
```

Story state must not advance until the stage adapter returns a successful commit result. A failed stage request retains the previous story observation and save.

## Composition rule

The Story domain owns narrative state and persistence. The Stage domain owns Three.js preparation, commit and disposal. The adapter composes typed results but neither domain reaches into the other's mutable internals.

## Queue order

```txt
1. story source/save/phase authority
2. atomic stage commit and resource lifecycle
3. composed story-stage transition transaction
4. bounded diagnostics and browser fixtures
```
