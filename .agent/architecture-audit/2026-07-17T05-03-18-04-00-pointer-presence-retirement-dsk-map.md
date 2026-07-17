# Architecture audit: pointer presence, hover and parallax retirement

**Timestamp:** `2026-07-17T05-03-18-04-00`  
**Status:** `pointer-presence-hover-parallax-retirement-authority-audited`

## Summary

The stage currently treats the latest in-canvas mouse sample as indefinitely valid. Hover projection and parallax consume that mutable cache directly. Pointer presence, scene identity and projection settlement need one explicit semantic boundary.

## Current ownership

```txt
StageKit constructor
  -> owns renderer canvas listeners
  -> owns pointer and mouse vectors
  -> owns hovered hotspot cache
  -> owns hover-label DOM projection
  -> owns camera parallax consumption

loadScene
  -> replaces stage geometry, hotspots and materials
  -> does not retire predecessor pointer state

animate
  -> consumes retained mouse x/y every frame
```

## DSK map

```txt
the-unmapped-house-pointer-presence-hover-parallax-retirement-authority-domain
├─ pointer-session-kit
│  └─ PointerSessionId, SceneGeneration, ViewportRevision
├─ pointer-sample-admission-command-kit
│  └─ admit enter/move evidence against expected generations
├─ pointer-sample-result-kit
│  └─ normalized coordinates, hit identity and terminal status
├─ pointer-presence-state-kit
│  └─ inside, outside, cancelled, blurred, hidden or retired
├─ pointer-generation-kit
│  └─ apply-once ordering and stale-sample rejection
├─ pointer-exit-classifier-kit
│  └─ leave, cancel, blur, visibility and scene replacement
├─ pointer-retirement-command-kit
│  └─ terminally retire current pointer evidence
├─ pointer-retirement-result-kit
│  └─ retired, duplicate, stale or failed settlement
├─ stale-pointer-sample-rejection-kit
│  └─ reject predecessor callbacks and samples
├─ hover-target-generation-kit
│  └─ bind hotspot identity to scene and pointer generation
├─ hover-label-projection-kit
│  └─ text, visibility and position from accepted target only
├─ parallax-target-generation-kit
│  └─ bind camera offset target to accepted sample
├─ parallax-neutralization-kit
│  └─ immediate or bounded easing to neutral after retirement
├─ scene-pointer-retirement-kit
│  └─ retire pointer state before scene replacement commits
├─ first-neutral-pointer-frame-ack-kit
│  └─ acknowledge hidden label and neutral camera projection
├─ pointer-presence-browser-fixture-kit
│  └─ leave/cancel/blur/visibility/scene fixtures
└─ source-artifact-pages-pointer-parity-fixture-kit
   └─ prove equivalent results at all delivery origins
```

## Command/result contract

```txt
PointerSampleAdmissionCommand
  -> PointerSampleAdmissionResult

PointerPresenceRetirementCommand
  -> PointerPresenceRetirementResult

PointerProjectionCommitCommand
  -> PointerProjectionCommitResult
  -> FirstNeutralPointerFrameAck
```

## Adoption boundary

Do not move story inspection or raw raycasting into this authority. It owns the validity and retirement of pointer evidence and the hover/parallax projections derived from that evidence. Hotspot activation remains under the retained picking and inspection authorities.