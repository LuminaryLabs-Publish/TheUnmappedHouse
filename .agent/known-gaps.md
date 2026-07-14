# Known gaps: The Unmapped House interlude focus and route admission

**Timestamp:** `2026-07-14T17-00-55-04-00`  
**Status:** `audited`

## Summary

Visual interlude state, semantic modal state, keyboard focus and route-command admission are not correlated. Hidden controls can remain executable and visible modal presentation does not suspend background commands.

## Plan ledger

**Goal:** make every modal, focus, route and frame dependency explicit and testable.

- [x] Trace hidden and open interlude interaction states.
- [x] Confirm the route boundary lacks completion validation.
- [x] Confirm focus transfer, inertness and restoration are absent.
- [x] Define missing identities, results and proof.
- [ ] Implement and execute them.

## Identity gaps

```txt
InterludeGeneration: absent
InterludeCommandId: absent
StoryRevision: absent
SceneRevision: absent
RouteRevision: absent
CompletionEvidenceId: absent
FocusOwnerRevision: absent
BackgroundInertRevision: absent
FirstFocusStableFrameId: absent
```

## Closed-interlude gaps

```txt
hidden attribute or inert state: absent
Continue disabled while hidden: no
Continue removed from tab order: no
hidden Continue command rejection: absent
premature route advancement guard: absent
```

## Open-interlude gaps

```txt
dialog role: absent
aria-modal: absent
accessible dialog name binding: absent
prior focus capture: absent
focus transfer to Continue: absent
focus containment: absent
background inertness: absent
canvas command suspension: absent
hotspot-button command suspension: absent
reset-shortcut modal policy: absent
```

## Route-settlement gaps

```txt
active interlude assertion: absent
scene completion assertion inside nextScene: absent
expected scene and route revisions: absent
stale Continue rejection: absent
duplicate Continue rejection: absent
atomic route/stage/UI/focus settlement: absent
successor focus policy: absent
focus restoration receipt: absent
```

## Current bypass path

```txt
page boots
  -> interlude opacity is zero
  -> aria-hidden is true
  -> Continue remains focusable
  -> keyboard activates Continue
  -> nextScene does not check completion
  -> route and save advance before required clues
```

## Visible proof gaps

```txt
first semantic-modal frame acknowledgement: absent
active focus owner in frame evidence: absent
background inert state in frame evidence: absent
first successor focus-stable frame acknowledgement: absent
source/artifact/Pages focus parity: absent
```

## Validation gaps

```txt
keyboard-only fixture: absent
hidden-control tab-order fixture: absent
premature route-bypass fixture: absent
modal focus containment fixture: absent
screen-reader dialog fixture: absent
background-command rejection fixture: absent
focus restoration fixture: absent
terminal focus fixture: absent
production-artifact fixture: absent
Pages-origin fixture: absent
```

## Retained independent gaps

```txt
page lifecycle suspension and resume
terminal completion settlement and resume
WebGL context recovery
story-save schema and manifest admission
viewport authority
scene-transition composition
renderer-provider admission
hotspot picking
save commit/reset convergence
interlude timer progression
stage resource lifecycle
```

## Completion boundary

Do not claim accessible or progression-safe interludes because the overlay looks modal. Completion requires a route guard, non-interactive hidden state, semantic modal admission, inert background controls, deterministic focus transfer/restoration, typed command results and a first focus-stable frame bound to the accepted revisions.