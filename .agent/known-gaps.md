# Known gaps: The Unmapped House

**Timestamp:** `2026-07-12T06-30-34-04-00`

## Summary

The newest documented gap is modal focus and Continue admission. The interlude is visually closed but remains mounted with an enabled Continue button, while the open state does not isolate keyboard focus or background commands. `nextScene()` accepts every button activation without a completion-proof or modal-state guard.

## Plan ledger

**Goal:** keep keyboard inertness, modal semantics, Continue proof admission and retained story/render dependencies explicit.

- [x] Trace the interlude DOM, closed/open CSS and native button behavior.
- [x] Confirm Continue is never disabled, inert or removed from focus order.
- [x] Confirm opening does not capture, move, trap or restore focus.
- [x] Confirm background inspection controls remain keyboard reachable.
- [x] Confirm `nextScene()` has no completion or modal-generation guard.
- [x] Define fixture and browser proof gaps.
- [ ] Implement and execute the modal focus authority.

## Closed-state gaps

```txt
interlude inert: absent
Continue disabled while closed: absent
Continue removed from tab order: absent
hidden-control activation rejection: absent
closed modal generation: absent
closed-state observation: absent
```

## Open-modal gaps

```txt
role=dialog: absent
aria-modal=true: absent
focus origin capture: absent
focus entry: absent
focus trap: absent
background inertness: absent
background command suspension: absent
focus return: absent
modal lease: absent
```

## Continue admission gaps

```txt
Continue command id: absent
current modal generation: absent
scene completion proof requirement: absent
proof consumption: absent
stale activation rejection: absent
duplicate activation handling: absent
typed Continue result: absent
modal/transition correlation: absent
```

## Concrete risks

```txt
hidden Continue can be keyboard-activated before any clue is collected
repeated hidden activation can skip all authored scenes
open interlude does not prevent background keyboard inspection commands
screen-reader semantics can disagree with native focus reachability
Continue can transition from stale or unproven UI state
```

## Retained upstream and downstream gaps

```txt
StoryManifest and StorySnapshot authorities remain unimplemented
storage revision and cross-tab convergence remain unimplemented
canvas and side-panel input parity remains unimplemented
inspection/completion proof remains unimplemented
Atomic Continue transaction remains unimplemented
narrative projection remains unrevisioned
runtime callback and scene-resource lifecycle remains unimplemented
render-surface and WebGL context generations remain unimplemented
committed-frame diagnostics remain unimplemented
```

## Validation gaps

- `npm run check` is syntax-only.
- No DOM fixture proves hidden Continue is absent from sequential focus.
- No browser keyboard smoke proves scene skip is impossible.
- No modal fixture proves background controls are inert.
- No assistive-technology contract verifies dialog semantics.
- No typed result proves Continue consumed a current completion proof.
- No frame observation cites the modal generation that authorized transition.

## Completion boundary

Do not claim modal or Continue correctness because the overlay blocks pointer clicks. Completion requires keyboard-inert closed state, focus-isolated open state, proof-admitted Continue, typed results and browser/accessibility proof.
