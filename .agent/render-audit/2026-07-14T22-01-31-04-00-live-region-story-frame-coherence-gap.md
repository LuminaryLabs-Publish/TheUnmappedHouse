# Render audit: live-region and visible story-frame coherence gap

**Timestamp:** `2026-07-14T22-01-31-04-00`  
**Status:** `audited`

## Plan ledger

**Goal:** prove that the visible story result and assistive-technology message describe the same accepted revision.

- [x] Trace DOM projection after boot, inspection and route changes.
- [x] Identify the absence of a semantic-frame acknowledgement.
- [ ] Add correlated visual and accessibility proof.

## Finding

The visible frame is updated through `textContent`, button replacement, debug JSON replacement and Three.js rendering. The accessibility projection is not a separate accepted participant. A screen reader may receive reordered or repeated subtree mutations while the visual user sees one stable result.

## Required proof

```txt
StoryRevision
SceneRevision
StoryAnnouncementRevision
visible narrative text fingerprint
dedicated status text fingerprint
control-tree exclusion receipt
debug-tree exclusion receipt
FirstSemanticAnnouncementAck
FirstAnnouncementMatchedStoryFrameAck
```

No visible/audible coherence or production parity is currently proven.
