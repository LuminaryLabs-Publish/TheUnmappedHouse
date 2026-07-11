# Interaction audit: Continue command admission and result map

Timestamp: `2026-07-11T10-12-03-04-00`

## Goal

Replace the direct button callback with one canonical command surface that can reject stale, duplicate and incomplete transition requests.

## Current ingress

```txt
continueButton.addEventListener("click", nextScene)
```

The callback captures no command data and returns no result.

## Required command

```txt
ContinueCommand
  commandId
  inputSequence
  source: "interlude-button"
  storyManifestId
  manifestFingerprint
  sceneId
  expectedStoryRevision
  expectedStageEpoch
  completionProofId
  requestedAtFrameId
```

## Admission map

| Condition | Result | Mutation |
|---|---|---|
| Unknown command shape | `invalid` | none |
| Manifest mismatch | `incompatible` | none |
| Scene mismatch | `stale_scene` | none |
| Story revision mismatch | `stale_story_revision` | none |
| Stage epoch mismatch | `stale_stage_epoch` | none |
| Missing/invalid completion proof | `blocked_incomplete` | none |
| Duplicate command id | `duplicate` | none |
| Transition already active | `busy` | none |
| Final scene already terminal | `terminal_noop` | none |
| Valid next-scene request | `accepted` | transition plan only |
| Preparation failure | `prepare_failed` | candidate disposed; committed state unchanged |
| Persistence failure | `save_failed` | committed state unchanged |
| Stage commit failure | `commit_failed` | rollback/compensation policy |
| First frame observed | `committed_visible` | final receipt and journal row |

## Result contract

```txt
ContinueResult
  commandId
  transitionId
  status
  reason
  sourceSceneId
  targetSceneId
  sourceStoryRevision
  targetStoryRevision
  sourceStageEpoch
  targetStageEpoch
  saveRevision
  firstVisibleFrameId
  beforeFingerprint
  afterFingerprint
```

## Browser binding rule

The button must only publish a command. It must not directly mutate story, DOM, persistence or StageKit. UI disabled/pending/error state must be a projection of the authoritative transition result.

## Required interaction fixtures

```txt
button-click-produces-one-command
double-click-produces-one-accepted-one-duplicate-or-busy
stale-button-closure-cannot-advance-new-scene
invalid-completion-proof-blocked
terminal-button-repeat-noop
result-projection-does-not-author-state
```
