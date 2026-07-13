# Gameplay audit: provider failure before the story loop

**Timestamp:** `2026-07-13T04-29-43-04-00`

## Summary

Story initialization is coupled to renderer-provider evaluation. The game cannot load state, render authored controls, expose reset/retry behavior or publish a gameplay boot result until the remote Three.js dependency has evaluated.

## Plan ledger

**Goal:** keep provider failure outside the story aggregate while ensuring it produces an explicit boot result and recoverable player-facing state.

- [x] Trace static module dependencies before story-state construction.
- [x] Confirm provider rejection prevents all `game.js` boot work.
- [x] Separate provider admission from story semantics.
- [x] Define gameplay admission after accepted provider capability.
- [ ] Implement provider-independent retry and story-start fixtures.

## Current boot coupling

```txt
provider import succeeds
  -> game.js evaluates
  -> loadState()
  -> resolve current scene
  -> new StageKit(...)
  -> loadScene(currentScene)
  -> renderUi()
  -> saveState()

provider import fails
  -> game.js body never runs
  -> no loadState()
  -> no scene resolution
  -> no story controls
  -> no Notebook projection
  -> no save/reset/retry result
```

## Gameplay consequence

The story itself is not corrupt, but the player has no authored distinction between:

```txt
provider unavailable
provider integrity rejected
provider API incompatible
stage construction failed
story boot failed
```

All can collapse into an incomplete static page.

## Required gameplay admission

```txt
RenderProviderResult Accepted or FallbackAccepted
  -> allocate StoryRuntimeGeneration
  -> construct StageKit
  -> load canonical story state
  -> load current scene
  -> project story and Notebook
  -> publish StoryBootResult
  -> acknowledge first playable frame

any non-accepted provider result
  -> do not create story runtime generation
  -> do not mutate or persist story state
  -> project provider-independent recovery UI
```

## Independence rule

Renderer-provider authority must not absorb story rules. It only supplies a verified capability or a typed failure. Story boot remains owned by `browser-story-runtime-kit` and consumes the accepted capability.

## Validation boundary

No gameplay, story, save or stage behavior changed. The failure path was inferred from static ES-module evaluation order and was not executed.