# Gameplay audit: story inspection and continuous frame work

**Timestamp:** `2026-07-18T09-40-39-04-00`  
**Status:** `audited`

## Player loop

```txt
inspect hotspot
  -> record inspection
  -> grant clues
  -> update story text and Notebook
  -> persist state
  -> complete scene requirements
  -> show interlude
  -> Continue to next scene
```

The story loop is event-driven, but the stage remains continuously rendered while the player reads, considers choices, uses DOM controls, views an interlude or reaches the terminal prototype state.

## Frame-work relationship

```txt
story state may be unchanged
  -> RAF callback closure still created
  -> camera scratch Vector3 still cloned
  -> all material times still updated
  -> stage pass still submitted
  -> post pass still submitted
```

This audit does not propose suspending rendering solely because story state is unchanged; animated materials, post effects and pointer parallax can require frames. It requires the recurring work to be explicit, reusable where practical, observable and bound to the accepted stage/frame generation.

## Gameplay proof needed

```txt
idle reading fixture
hotspot hover and parallax fixture
DOM inspection fixture
interlude fixture
terminal-state fixture
hidden-page fixture
```

Each fixture should verify story behavior remains unchanged while source-owned transient frame allocations are measured and the accepted frame-work digest reaches the presented frame.