# Architecture audit: motion preference and visual-effect DSK map

**Timestamp:** `2026-07-15T02-59-31-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `motion-preference-visual-effect-admission-authority-audited`

## Summary

Motion is distributed across renderer, shader, camera and CSS participants. No parent domain resolves preference and settles those participants as one generation.

## Plan ledger

**Goal:** define the smallest semantic authority that coordinates existing surfaces without restructuring the story or renderer.

- [x] Map current ownership.
- [x] Preserve all implemented kits.
- [x] Define parent domain and child surfaces.
- [x] Define command, result and frame acknowledgement.
- [ ] Implement after fixture contracts exist.

## Current ownership map

```txt
browser-story-runtime-kit
  -> story and route truth

stage-render-kit
  -> clock, RAF and frame submission

anime-material-kit
  -> time-driven stage drift

post-process-kit
  -> time-driven warp, grain and scan lines

camera-parallax-kit
  -> pointer-driven camera displacement

static-page-shell-kit + CSS
  -> interlude transition

no domain
  -> motion preference resolution
  -> participant profile settlement
  -> live preference replacement
  -> visible-frame acknowledgement
```

## Required parent domain

```txt
the-unmapped-house-motion-preference-visual-effect-admission-authority-domain
```

## Child surfaces

- `the-unmapped-house-motion-preference-visual-effect-admission-authority-domain`
- `motion-preference-query-kit`
- `motion-profile-descriptor-kit`
- `motion-profile-revision-kit`
- `motion-admission-command-envelope-kit`
- `explicit-motion-setting-kit`
- `system-motion-preference-listener-kit`
- `stage-shader-motion-policy-kit`
- `post-process-motion-policy-kit`
- `camera-parallax-motion-policy-kit`
- `interlude-transition-motion-policy-kit`
- `active-motion-participant-registry-kit`
- `motion-profile-candidate-preparation-kit`
- `motion-profile-atomic-adoption-kit`
- `stale-motion-profile-rejection-kit`
- `motion-profile-projection-result-kit`
- `first-motion-matched-frame-ack-kit`
- `motion-preference-persistence-kit`
- `motion-observation-diagnostics-kit`
- `reduced-motion-browser-fixture-kit`
- `artifact-pages-motion-parity-kit`

## Service boundary

The domain owns preference identity, profile revision, participant admission, atomic replacement and result publication. Existing renderer, camera and shell kits continue to execute the accepted descriptors.

## Result statuses

```txt
MotionProfileAccepted
MotionProfileUnchanged
MotionProfileRejectedInvalid
MotionProfileRejectedStale
MotionProfileRejectedSuperseded
MotionParticipantPreparationFailed
MotionProfileAdoptionFailed
MotionProfileRolledBack
FirstMotionMatchedFrameAcknowledged
MotionProfileArtifactParityConfirmed
```

## Non-goals

```txt
no story-state redesign
no scene-descriptor rewrite
no new renderer
no RAF replacement
no shader removal
no accessibility-audit merger
```
