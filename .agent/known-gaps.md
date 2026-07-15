# Known gaps: The Unmapped House story announcement semantic projection

**Timestamp:** `2026-07-14T22-01-31-04-00`  
**Status:** `audited`

## Summary

Interactive controls, diagnostics and narrative output share one broad live-region owner. The source contains no intentional announcement transaction.

## Plan ledger

**Goal:** make message identity, projection and proof explicit.

- [x] Trace live-region ownership.
- [x] Trace every broad subtree rebuild.
- [x] Define missing identities, policies and results.
- [ ] Implement and execute them.

## Identity gaps

```txt
StoryAnnouncementCommandId: absent
StoryAnnouncementRevision: absent
SemanticMessageDescriptorId: absent
SourceResultId binding: absent
AnnouncementPriority: absent
FirstSemanticAnnouncementAck: absent
```

## Semantic-region gaps

```txt
dedicated status element: absent
control-tree exclusion: absent
debug-tree exclusion: absent
aria-atomic policy: absent
aria-relevant policy: absent
message coalescing: absent
duplicate suppression: absent
stale rejection: absent
```

## Current mutation path

```txt
renderUi
  -> replace scene title and narrative where applicable
  -> clear hotspot list
  -> create and attach every button
  -> replace full JSON projection
  -> all changes occur inside aria-live="polite"
```

## Message gaps

```txt
scene-arrival message: implicit
inspection result message: implicit
clue acquisition message: implicit
scene completion message: implicit
interlude message: implicit
route transition message: implicit
terminal message: implicit
```

## Proof gaps

```txt
screen-reader announcement capture: absent
accessibility-tree diff fixture: absent
duplicate-announcement fixture: absent
re-read coalescing fixture: absent
source/artifact/Pages parity: absent
visible-story to semantic-message acknowledgement: absent
```

## Retained independent gaps

```txt
interlude focus and route admission
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

Do not claim screen-reader-ready story presentation until controls and diagnostics are excluded from live-region ownership, messages are authored and revisioned, duplicates and stale work are rejected, and browser proof captures the first accepted semantic announcement.
