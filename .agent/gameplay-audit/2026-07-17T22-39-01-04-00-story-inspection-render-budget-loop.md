# Gameplay audit: story inspection and render-budget loop

**Timestamp:** `2026-07-17T22-39-01-04-00`  
**Status:** `audited`

## Interaction loop

```txt
enter authored scene
  -> inspect three hotspots
  -> grant required clues
  -> show interlude
  -> advance to next scene
  -> repeat through three scenes
```

The narrative loop is low-frequency, but the renderer continuously executes a full scene pass and post pass regardless of whether the player is idle, reading, hovering or inspecting.

## Gameplay relevance

- The experience depends on stable frame pacing during reading and pointer inspection.
- High physical buffer sizes can consume capacity without adding new gameplay state.
- Resolution degradation must not alter hotspot coordinate mapping or fixed-aspect layout.
- A fallback must preserve the authored scene and interaction loop rather than failing startup.

## Required policy

```txt
accepted quality generation
  -> stable CSS aspect frame
  -> bounded physical render surfaces
  -> unchanged hotspot semantics
  -> presented frame acknowledgement
```

## Boundary

No gameplay behavior changed. No claim is made that current devices miss frame targets.