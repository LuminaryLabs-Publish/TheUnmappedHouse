# Known gaps: The Unmapped House

**Timestamp:** `2026-07-12T10-30-00-04-00`

## Summary

The newest documented gap is destructive reset admission. The only save key is removed by any global `KeyR` keydown, including normal browser refresh chords. Reset has no confirmation, revision fence, tombstone, typed effect result or clean-frame proof.

## Plan ledger

**Goal:** prevent unconfirmed or ambiguous keyboard input from destroying durable progress.

- [x] Trace global keyboard reset.
- [x] Confirm modifier chords are not excluded.
- [x] Confirm repeat, trust, focus and visibility are not checked.
- [x] Confirm storage deletion occurs before reload.
- [x] Confirm reset has no expected revisions or typed result.
- [x] Define reset barriers and browser fixtures.
- [ ] Implement and execute the reset authority.

## Admission gaps

```txt
reset command id: absent
reset generation: absent
binding policy: absent
Ctrl+R exclusion: absent
Meta+R exclusion: absent
modifier policy: absent
trusted-event policy: absent
repeat rejection: absent
focus-context policy: absent
visibility policy: absent
confirmation capability: absent
story phase admission: absent
expected story revision: absent
expected storage revision: absent
typed rejection result: absent
```

## Effect and barrier gaps

```txt
durable reset tombstone: absent
cross-tab stale-writer barrier: absent
pending timer cancellation result: absent
runtime retirement result: absent
typed storage remove result: absent
storage failure recovery: absent
reload admission result: absent
first clean boot receipt: absent
first clean frame acknowledgement: absent
reset observation: absent
bounded reset journal: absent
```

## Concrete risks

```txt
Ctrl+R or Meta+R can erase progress during an ordinary refresh
synthetic or repeated KeyR events can request destructive reset
background or hidden-page input has no explicit rejection
storage removal can fail without a typed fallback or user-visible result
another tab can later rewrite stale progress unless a reset tombstone is enforced
pending timers and runtime work have no reset transaction boundary
the user cannot distinguish a committed reset from a failed storage effect
```

## Retained upstream and downstream gaps

```txt
StoryManifest and StorySnapshot authorities remain unimplemented
storage revision and cross-tab convergence remain unimplemented
pointer/canvas/side-panel input parity remains unimplemented
inspection and completion proof remain unimplemented
completion timer generation remains unimplemented
modal focus and Continue admission remain unimplemented
atomic Continue transition remains unimplemented
narrative projection remains unrevisioned
runtime callback and scene-resource lifecycle remains unimplemented
render-surface and WebGL context generations remain unimplemented
committed-frame diagnostics remain unimplemented
```

## Validation gaps

- `npm run check` is syntax-only.
- No pure binding-policy fixture classifies `R`, `Ctrl+R`, `Meta+R` and repeat events.
- No fixture proves rejected reset intents perform zero storage mutation.
- No storage-failure fixture proves progress is not reported cleared when removal fails.
- No cross-tab fixture proves stale writers cannot resurrect reset progress.
- No browser smoke proves refresh preserves the save.
- No confirmed-reset smoke proves the first clean frame belongs to the reset generation.

## Completion boundary

Do not claim reset safety because `R` appears intentional in a manual test. Completion requires explicit command admission, browser-refresh exclusion, confirmation, expected revisions, a durable reset barrier, typed effects and executable browser proof.
