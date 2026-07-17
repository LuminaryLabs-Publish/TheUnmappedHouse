# Gameplay audit: pointer exit and scene-transition loop

**Timestamp:** `2026-07-17T05-03-18-04-00`

## Interaction loop

```txt
player moves across stage
  -> raycast selects a hotspot
  -> hover label identifies the inspection
  -> camera parallax follows pointer

player leaves stage or completes scene
  -> pointer evidence is no longer current
  -> interlude or successor scene can replace the context
  -> retained hovered/mouse state is still consumed
```

## Gameplay consequence

The stale state does not mutate clues directly, but it can misrepresent the currently available inspection and preserve a camera pose from the predecessor interaction context. The visual affordance can therefore disagree with the active scene and hotspot generation.

## Required behavior

- Retire pointer evidence before scene replacement commits.
- Hide the hover label when the pointer is no longer inside the active stage.
- Clear the predecessor hotspot identity.
- Return camera parallax to neutral immediately or through one bounded easing policy.
- Reject late samples from retired scene or pointer generations.
- Acknowledge the first frame showing the neutral state.

## Boundary

Hotspot clue grants, scene completion, route advancement and save behavior remain unchanged. This audit only covers interaction evidence and its visible projection.