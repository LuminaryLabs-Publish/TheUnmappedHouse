# Gameplay audit: Inspect, interlude, Continue, and narrative-copy loop

Timestamp: `2026-07-12T00-01-25-04-00`

## Interaction loop

```txt
boot
  -> load raw state
  -> choose current scene
  -> allocate StageKit
  -> load current stage
  -> render opening copy only when the DOM body is empty

inspect hotspot
  -> write hotspot text directly into #scene-text
  -> mutate inspection and clue ledgers
  -> update log
  -> optionally schedule completion interlude
  -> render UI without replacing the body
  -> persist state

Continue
  -> choose scenes[index + 1]
  -> mutate current scene and route
  -> close interlude
  -> load successor stage
  -> render successor title, buttons and debug state
  -> leave prior hotspot body untouched
  -> persist successor state
```

## Gameplay consequence

The player can enter a new room while reading descriptive text from the previous room. The contradiction persists until the player inspects a successor hotspot or reloads the page.

This is not a cosmetic-only issue. Narrative copy communicates the current room, reveals clues, frames player intent and is announced through an `aria-live` story panel.

## Additional policy ambiguity

The runtime does not define whether reload should restore:

```txt
the exact last narrative projection
or
the canonical opening copy of the saved scene
```

Current behavior implicitly chooses the saved scene opening because the DOM is empty after reload, while in-session transitions can retain predecessor hotspot copy. The two paths therefore follow different undocumented policies.

## Required gameplay result chain

```txt
InspectionResult accepted
  -> HotspotNarrativeProjection committed

SceneCompletionProof accepted
  -> CompletionNarrativeProjection committed

ContinueResult accepted
  -> SuccessorOpeningProjection committed
  -> predecessor projection retired

TerminalResult accepted
  -> TerminalNarrativeProjection committed
```

## Required invariants

```txt
current scene and narrative projection always agree
one accepted inspection produces at most one hotspot projection revision
Continue retires predecessor hotspot and interlude projections
reload policy is explicit and fixture-backed
terminal copy cannot be confused with an ordinary completion interlude
```

## Gameplay fixtures

```txt
inspect-nonfinal-hotspot-projects-copy
reinspect-projects-canonical-copy-with-new-result
complete-scene-projects-interlude
continue-projects-successor-opening
reload-valid-scene-follows-declared-copy-policy
terminal-continue-projects-durable-terminal-copy
```
