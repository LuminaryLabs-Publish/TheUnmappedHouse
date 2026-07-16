# Architecture audit: hotspot availability and discovery DSK map

**Timestamp:** `2026-07-16T09-58-49-04-00`  
**Status:** `audited`

## Summary

The current architecture has two independent hotspot projections: DOM buttons from `currentScene.hotspots` and Three.js volumes from the same array. They share authored data but not an explicit availability authority, revision, result, or acknowledgement.

## Plan ledger

**Goal:** define the smallest DSK family that makes hotspot availability deterministic without moving story truth into rendering or DOM handlers.

- [x] Preserve story, renderer, picking, save, focus, and content-validation authorities.
- [x] Define one parent hotspot-availability domain.
- [x] Separate policy, indexes, projections, interaction admission, retirement, results, and proof.
- [ ] Implement after story-content validation can provide an accepted scene generation.

## Parent domain

`the-unmapped-house-hotspot-availability-discovery-projection-authority-domain`

## DSK breakdown

| DSK | Owns | Does not own |
|---|---|---|
| `hotspot-availability-policy-kit` | Normalized availability rules and policy version | Story mutations or rendering |
| `scene-hotspot-index-kit` | Immutable scene-to-hotspot identity index | Authored-content validation |
| `hotspot-discovery-state-kit` | Discovered/undiscovered state and revision | Clue granting |
| `hotspot-visibility-descriptor-kit` | Authored visibility and reveal conditions | Camera rendering |
| `hotspot-occlusion-query-kit` | Optional occlusion evidence bound to camera/frame | Final interaction decision |
| `hotspot-interaction-mode-kit` | List-only, canvas-only, both, disabled modes | Input device capture |
| `hotspot-modal-suspension-kit` | Interlude/terminal suspension policy | Interlude progression |
| `hotspot-list-projection-kit` | DOM projection from accepted availability | Story-state authority |
| `hotspot-canvas-pick-admission-kit` | Pick admission from accepted availability | Raw raycasting implementation |
| `hotspot-inspected-state-policy-kit` | Re-read and inspected availability rules | Inspection ledger mutation |
| `hotspot-clue-gate-policy-kit` | Clue-dependent reveal/enable rules | Clue grant authority |
| `hotspot-parity-result-kit` | Listed/visible/hoverable/pickable parity result | Presentation side effects |
| `stale-hotspot-generation-rejection-kit` | Scene/frame/policy generation rejection | Route selection |
| `hotspot-hover-retirement-kit` | Clears stale hover identity and label on transition | Pointer capture |
| `first-available-hotspot-frame-ack-kit` | First frame matching accepted set | Rendering itself |
| `first-hotspot-interaction-ack-kit` | First accepted interaction receipt | Narrative outcome |
| `source-artifact-pages-hotspot-parity-fixture-kit` | Source/build/deployed proof rows | Runtime authority |

## Command/result flow

```txt
ValidatedStoryContent
  -> SceneAdoptionResult
  -> HotspotAvailabilityCommand
  -> HotspotAvailabilityResult
  -> HotspotProjectionCommand
     -> DOM HotspotListProjectionResult
     -> Canvas HotspotPickProjectionResult
     -> HoverRetirementResult
  -> HotspotParityResult
  -> FirstAvailableHotspotFrameAck

input evidence
  -> HotspotInteractionCommand
  -> availability and generation checks
  -> HotspotInteractionResult
  -> existing inspectHotspot story command
```

## Boundary

This domain decides whether a hotspot may be represented or acted upon. It does not decide what inspection grants, whether a scene is complete, how Three.js renders geometry, or how DOM focus is restored.