# Known gaps: The Unmapped House

**Timestamp:** `2026-07-12T20-51-16-04-00`

## Summary

The newest documented gap is scene-progression and interlude authority. Completion facts, delayed presentation, keyboard focus, Continue admission and persisted route phase can diverge.

## Plan ledger

**Goal:** eliminate scene skipping, stale interludes, reload dead ends and post-completion ambiguity while preserving exact authored story order.

- [x] Trace completion and Continue from source.
- [x] Trace modal focus and hidden-control behavior.
- [x] Trace reload and terminal persistence.
- [x] Define candidate authority kits and fixture rows.
- [ ] Implement and execute the authority.

## Progression-state gaps

```txt
story run ID/generation: absent
scene phase: absent
scene revision: absent
route revision: absent
persisted completion-pending state: absent
persisted open-interlude state: absent
terminal outcome state: absent
startup phase reconciliation: absent
```

## Timer and transition gaps

```txt
completion timer handle: not retained
completion timer lease: absent
callback predecessor scene ID: absent
callback expected scene revision: absent
stale callback rejection: absent
duplicate callback result: absent
Continue command identity: absent
completion admission: absent
interlude-open admission: absent
exact-once scene advancement: absent
typed scene-transition result: absent
```

## Focus and interaction gaps

```txt
closed Continue disabled/inert: no
closed Continue removed from tab order: no
dialog role/aria-modal: absent
focus transfer to interlude: absent
focus trap or containment: absent
underlying story-panel inertness: absent
focus restoration result: absent
keyboard input-context generation: absent
```

## Persistence and terminal gaps

```txt
reload after completion recovery: absent
reload with pending timer recovery: absent
reload with open interlude recovery: absent
terminal phase persistence: absent
terminal result identity: absent
post-terminal Continue rejection: absent
```

## Presentation gaps

```txt
phase in Notebook projection: absent
timer/transition result in Notebook: absent
first visible interlude frame acknowledgement: absent
first visible successor frame acknowledgement: absent
terminal visible-frame acknowledgement: absent
```

## Retained independent gaps

```txt
story manifest/snapshot admission implementation
storage concurrency and destructive reset
stage resource disposal and runtime stop
Notebook channel separation
render-surface budgeting and context recovery
committed-frame diagnostics
```

## Completion boundary

Do not claim progression safety because pointer events are blocked by CSS or because required clues usually cause the overlay to appear. Completion requires fail-closed command admission, keyboard focus fixtures, generation-bound timer cancellation, persisted phase reconciliation, exact-once advancement and visible-frame evidence.
