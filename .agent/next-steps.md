# Next steps: The Unmapped House story audio event projection

**Timestamp:** `2026-07-15T12-59-24-04-00`  
**Status:** `audited`

## Summary

The smallest safe implementation is a procedural Web Audio adapter that unlocks from an accepted user gesture, consumes accepted semantic story results and retires all owned nodes on lifecycle replacement.

## Plan ledger

**Goal:** add useful horror-story audio without coupling story success to raw input or render callbacks.

- [ ] Define stable `SemanticAudioEventId` values for inspection, clue, interlude, route, terminal and UI results.
- [ ] Add an authored `CueDescriptor` registry with explicit silence support.
- [ ] Observe browser audio capability without creating audible nodes.
- [ ] Admit one `AudioContextGeneration` from an existing accepted gesture.
- [ ] Add master, ambience, story-effects and UI buses.
- [ ] Add mute and volume preferences with revisioned persistence.
- [ ] Project first and repeated inspections through distinct cue policies.
- [ ] Deduplicate clue, completion and transition cues by event ID.
- [ ] Adopt one scene ambience generation with the accepted scene revision.
- [ ] Use the fixed camera as the listener descriptor when spatial cues are enabled.
- [ ] Enforce pooling, priority and voice budgets.
- [ ] Suspend or attenuate on visibility loss without replaying one-shots on resume.
- [ ] Retire loops and nodes on pagehide, route replacement and context replacement.
- [ ] Publish `AudioProjectionResult`, `FirstAudibleCueAck` and `FirstAudioVisualConvergenceAck`.
- [ ] Add source, artifact and Pages browser fixtures.

## Ordered implementation

### 1. Semantic events

Publish accepted story-result descriptors after inspection, clue, interlude, scene and terminal settlement. Raw click and raycast handlers must not play success cues directly.

### 2. Browser admission

Create or resume one Web Audio context only from an accepted gesture. Unsupported or muted operation must preserve complete playability.

### 3. Procedural cues and ambience

Use small oscillator/noise envelopes so the static site remains asset-free. Keep cue descriptions data-driven and permit authored silence.

### 4. Lifecycle and deduplication

Key one-shot playback by semantic event ID and audio generation. Replace scene ambience atomically and disconnect every owned node during retirement.

### 5. Prove behavior

Test unlock, unsupported fallback, muted playthrough, first/repeated inspection, clue dedupe, scene transition, terminal completion, visibility resume, pagehide cleanup, voice budget and source/artifact/Pages parity.

## Do not combine yet

Keep inspection-focus continuity, story announcements, interlude modal focus, motion preference, page lifecycle, save schema, WebGL recovery, viewport, hotspot picking and resource lifecycle as retained independent authorities.