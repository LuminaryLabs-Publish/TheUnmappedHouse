# Architecture audit: story audio event projection DSK map

**Timestamp:** `2026-07-15T12-59-24-04-00`  
**Status:** `story-audio-event-projection-authority-audited`

## Summary

The story runtime owns accepted scene, inspection, clue, interlude and terminal state. DOM and Three.js adapters project that state visually. No domain currently converts accepted results into browser-audio cues.

## Plan ledger

**Goal:** define a renderer-neutral audio projection boundary whose inputs are accepted semantic results and whose outputs are typed audible receipts.

- [x] Preserve all 24 implemented kits.
- [x] Keep story truth in the existing runtime.
- [x] Keep Web Audio and HTML audio as host adapters.
- [x] Separate capability, unlock, cue policy, lifecycle and proof.
- [ ] Implement and validate the authority.

## Existing domain map

```txt
story-data-kit
  -> authored scenes hotspots clues completion and presentation descriptors

browser-story-runtime-kit
  -> accepted inspection clue route interlude and terminal state

DOM projection
  -> title narrative controls Notebook and interlude

StageKit
  -> Three.js world hotspot raycast camera post and visible frame

missing boundary
  -> accepted story result to semantic audio event to browser audio projection
```

## Proposed parent domain

```txt
the-unmapped-house-story-audio-event-projection-authority-domain
```

## Proposed surfaces

```txt
01 audio-capability-observation-kit
02 user-gesture-audio-admission-kit
03 audio-context-lifecycle-kit
04 semantic-story-audio-event-kit
05 audio-cue-descriptor-registry-kit
06 inspection-result-audio-projection-kit
07 clue-grant-audio-projection-kit
08 interlude-audio-projection-kit
09 terminal-audio-projection-kit
10 ui-audio-projection-kit
11 ambience-state-projection-kit
12 listener-pose-projection-kit
13 spatial-source-projection-kit
14 audio-bus-preference-kit
15 mute-volume-persistence-kit
16 cue-deduplication-kit
17 audio-voice-pool-budget-kit
18 audio-lifecycle-settlement-kit
19 audio-projection-result-kit
20 first-audible-cue-ack-kit
21 first-audio-visual-convergence-ack-kit
22 audio-artifact-pages-fixture-kit
```

## Command/result contract

```txt
AudioProjectionAdmissionCommand
  documentRevision
  runtimeRevision
  storyRevision
  sceneRevision
  audioPolicyRevision
  semanticResults[]
  listenerDescriptor

AudioProjectionResult
  status
  acceptedCueIds[]
  suppressedCueIds[]
  audioContextGeneration
  policyRevision
  storyRevision
  diagnostics[]
```

## Ownership rules

```txt
story runtime owns semantic truth
audio domain owns cue selection dedupe and policy
browser adapter owns AudioContext nodes and scheduling
renderer may supply camera/listener descriptors but never play cues
DOM handlers may unlock audio but never assume gameplay success
route and page lifecycle retire all owned nodes and loops
```

## Validation gate

No audio surface is implementation-ready until accepted story results, duplicate suppression, unlock behavior, lifecycle retirement and the first audiovisually matching frame are executable and observable.