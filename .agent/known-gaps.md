# Known gaps: The Unmapped House motion preference and visual-effect admission

**Timestamp:** `2026-07-15T02-59-31-04-00`  
**Status:** `audited`

## Summary

Continuous shader, post-process and camera motion plus transitional interlude motion are always active. The source has no preference identity, profile settlement or reduced-motion proof.

## Plan ledger

**Goal:** make motion preference, participant adoption and visible-frame evidence explicit.

- [x] Trace continuous and transitional motion participants.
- [x] Trace preference and settings surfaces.
- [x] Define missing identities, policies and results.
- [ ] Implement and execute them.

## Identity gaps

```txt
MotionPreferenceCommandId: absent
MotionProfileRevision: absent
MotionParticipantId: absent
ExplicitMotionSettingRevision: absent
SystemMotionPreferenceRevision: absent
FirstMotionMatchedFrameAck: absent
```

## Preference gaps

```txt
prefers-reduced-motion media query: absent
matchMedia listener: absent
explicit motion setting: absent
persisted override policy: absent
system-versus-explicit precedence: absent
live preference replacement: absent
```

## Participant gaps

```txt
stage shader time policy: always animated
post warp policy: always animated
post grain policy: always animated
post scan-line policy: always animated
camera parallax policy: always active
interlude transition policy: always 550 ms
participant registry: absent
atomic profile adoption: absent
stale-profile rejection: absent
```

## Current motion path

```txt
StageKit constructor
  -> create THREE.Clock
  -> start recursive RAF

each frame
  -> clock.getElapsedTime
  -> update stage material time
  -> update post material time
  -> apply pointer camera offsets
  -> submit stage and post frames

scene completion
  -> open interlude
  -> CSS opacity transition for 0.55 seconds
```

## Proof gaps

```txt
initial reduced-motion fixture: absent
live preference-change fixture: absent
explicit override fixture: absent
shader-time freeze fixture: absent
parallax-disable fixture: absent
transition-disable fixture: absent
first matching frame acknowledgement: absent
source/artifact/Pages parity: absent
```

## Retained independent gaps

```txt
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

Do not claim reduced-motion support until one accepted profile governs every continuous and transitional participant, live preference changes cannot create mixed generations, and browser proof captures the first frame matching the accepted profile.
