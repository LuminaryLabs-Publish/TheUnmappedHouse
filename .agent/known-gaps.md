# Known gaps: The Unmapped House story audio event projection

**Timestamp:** `2026-07-15T12-59-24-04-00`  
**Status:** `audited`

## Summary

Accepted story state has visible DOM and WebGL projection but no owned semantic audio projection, preferences, lifecycle or proof.

## Plan ledger

**Goal:** make browser-audio identity, policy, lifecycle and evidence explicit.

- [x] Trace accepted story and visual projection paths.
- [x] Confirm no active audio owner or cue registry exists.
- [x] Define missing identities, policies and results.
- [ ] Implement and execute them.

## Identity gaps

```txt
AudioContextGeneration: absent
AudioPolicyRevision: absent
SemanticAudioEventId: absent
CueDescriptorId: absent
AudioBusId: absent
AmbienceGeneration: absent
ListenerRevision: absent
SourceRevision: absent
FirstAudibleCueAck: absent
FirstAudioVisualConvergenceAck: absent
```

## Capability and admission gaps

```txt
Web Audio capability observation: absent
accepted user-gesture unlock: absent
unsupported fallback result: absent
deferred unlock queue: absent
context resume/replacement policy: absent
```

## Cue and ambience gaps

```txt
inspection cue policy: absent
repeated-inspection cue policy: absent
clue-grant cue policy: absent
interlude cue policy: absent
scene-transition cue policy: absent
terminal cue policy: absent
scene ambience ownership: absent
explicit authored silence: absent
```

## Preference and budget gaps

```txt
master volume: absent
ambience volume: absent
story-effects volume: absent
UI volume: absent
mute: absent
preference persistence: absent
cue pooling: absent
priority policy: absent
voice budget: absent
```

## Lifecycle and consistency gaps

```txt
semantic-result cue deduplication: absent
stale cue rejection: absent
superseded cue rejection: absent
visibility suspension: absent
resume without one-shot replay: absent
pagehide retirement: absent
route replacement retirement: absent
audio/visual story revision convergence: absent
```

## Proof gaps

```txt
supported-browser unlock fixture: absent
unsupported fallback fixture: absent
muted full-playthrough fixture: absent
first/repeated inspection cue fixture: absent
clue dedupe fixture: absent
ambience replacement fixture: absent
visibility/pagehide fixture: absent
voice-budget fixture: absent
source/artifact/Pages parity: absent
```

## Retained independent gaps

```txt
inspection control focus continuity
motion preference visual-effect admission
story announcement semantic projection
interlude focus and route admission
page lifecycle suspension and resume
terminal completion settlement
WebGL context recovery
story-save schema and manifest admission
viewport authority
scene-transition composition
renderer-provider admission
hotspot picking
save commit/reset convergence
interlude progression timing
stage resource lifecycle
```

## Completion boundary

Do not claim audible story readiness until accepted semantic results drive stable cue IDs, unlock and lifecycle behavior are explicit, duplicates cannot replay one-shot cues and browser proof captures the first audible and audiovisual acknowledgements.