# Render audit: silent story audiovisual frame gap

**Timestamp:** `2026-07-15T12-59-24-04-00`

## Summary

The renderer presents accepted scene, camera, hotspot and post-processing state, while the DOM presents accepted narrative and interlude state. No audio revision is bound to either visible presentation.

## Plan ledger

**Goal:** require one audiovisual presentation receipt that proves visible and audible projections describe the same accepted story revision.

- [x] Trace StageKit scene load and recursive RAF.
- [x] Trace DOM narrative, inspection and interlude projection.
- [x] Confirm no audio source or audio-frame identity is present.
- [ ] Add audio projection and convergence evidence.

## Current frame

```txt
accepted story state
  -> DOM title text controls Notebook interlude
  -> StageKit scene camera shaders hotspots post
  -> visible frame
  -> no accepted cue list
  -> no audio context generation
  -> no audible acknowledgement
```

## Missing evidence

```txt
AudioPolicyRevision
AudioContextGeneration
AcceptedCueIds
SuppressedCueIds
ListenerRevision
AmbienceRevision
FirstAudibleCueAck
FirstAudioVisualConvergenceAck
source artifact and Pages audio parity
```

## Required gate

A visible frame must identify the accepted story and scene revisions. Its matching audio result must identify the same revisions and report whether cues were played, suppressed, deferred for unlock or retired. Silence may be an authored result, but it must be explicit rather than the absence of an audio domain.