# Interaction audit: Continue proof admission and result map

Timestamp: `2026-07-11T13-49-30-04-00`

## Goal

Replace the direct Continue callback with one typed command path shared by button, replay, automation, and future accessibility ingress.

## Current path

```txt
Continue button click
  -> nextScene()
  -> no command id
  -> no sequence
  -> no completion-proof id
  -> no revision or stage admission
  -> no typed result
```

## Required command

```txt
ContinueCommand
  commandId
  inputSequence
  source
  sceneId
  completionProofId
  expectedStoryRevision
  expectedStageEpoch
```

## Required statuses

```txt
committed
duplicate
incomplete
unknown_proof
proof_consumed
stale_scene
stale_story_revision
stale_stage_epoch
prepare_failed
persistence_failed
commit_failed
rolled_back
terminal_committed
```

## Rule

All ingress must produce the same command shape and receive the same immutable result. No caller may invoke `nextScene()` or `StageKit.loadScene()` directly.