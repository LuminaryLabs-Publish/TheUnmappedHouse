# Interaction audit: story announcement command and result map

**Timestamp:** `2026-07-14T22-01-31-04-00`  
**Status:** `audited`

## Plan ledger

**Goal:** convert incidental accessibility-tree mutation into explicit semantic results.

- [x] Identify announcement producers.
- [x] Define command admission and rejection classes.
- [x] Bind messages to existing interaction results.
- [ ] Implement the map.

## Command map

```txt
StoryAnnouncementCommand
  commandId
  storyRevision
  sceneRevision
  sourceResultId
  messageKind
  priority
  textDescriptorId
```

## Result map

```txt
AnnouncementAccepted
AnnouncementCoalesced
AnnouncementRejectedDuplicate
AnnouncementRejectedStale
AnnouncementRejectedSuperseded
AnnouncementProjectionFailed
FirstSemanticAnnouncementAcknowledged
AnnouncementMatchedStoryFrameAcknowledged
```

Canvas picking, DOM buttons, focus and route commands remain independent. They supply accepted result IDs; they do not directly mutate the live region.
