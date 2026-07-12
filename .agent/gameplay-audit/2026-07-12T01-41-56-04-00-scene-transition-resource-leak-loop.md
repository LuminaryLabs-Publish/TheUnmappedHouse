# Scene transition resource leak loop

Timestamp: `2026-07-12T01-41-56-04-00`

## Summary

Story progression is short, but each Continue transition allocates a new scene resource graph without retiring the previous graph.

## Plan ledger

**Goal:** prevent scene progression from accumulating invisible GPU resources or allowing stale callback work to affect a successor scene.

- [x] Trace inspection, completion timeout, Continue and scene loading.
- [x] Confirm predecessor resources are detached rather than disposed.
- [x] Confirm timeout and frame work lack session/scene generation checks.
- [ ] Implement lifecycle and transition fixtures.

## Current gameplay loop

```txt
inspect final hotspot
  -> schedule completion timeout
  -> show interlude
  -> Continue
  -> mutate currentScene
  -> loadScene(successor)
  -> clear predecessor group
  -> allocate successor resources
  -> continue same RAF
```

## Failure modes

```txt
repeated scene loads
  -> resource accumulation

future in-place reset/restart
  -> stale completion callback can project old interlude

disposed or replaced stage
  -> stale pointer/click callbacks have no rejection path

partial successor build
  -> predecessor already cleared
  -> no rollback inventory
```

## Required gameplay invariant

A story transition must not commit until its successor scene-resource generation is complete. The predecessor remains authoritative until the first successor-frame acknowledgement, then retires exactly once.
