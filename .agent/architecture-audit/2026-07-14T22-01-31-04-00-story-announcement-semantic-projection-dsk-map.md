# Architecture audit: story announcement semantic projection DSK map

**Timestamp:** `2026-07-14T22-01-31-04-00`  
**Status:** `audited`

## Plan ledger

**Goal:** define one renderer-independent accessibility authority for intentional story announcements.

- [x] Map current DOM ownership and mutation sources.
- [x] Separate control semantics from narrative announcements.
- [x] Bind announcements to story and scene revisions.
- [x] Define accepted, rejected and acknowledged results.
- [ ] Implement the domain.

## Current composition

```txt
browser-story-runtime-kit
  -> renderUi
  -> story-panel aria-live subtree
     -> scene heading
     -> narrative text
     -> hotspot buttons
     -> Notebook/debug JSON

inspection, re-read, scene transition
  -> broad subtree mutation
  -> browser and assistive technology decide what is announced
```

## Required parent domain

```txt
the-unmapped-house-story-announcement-semantic-projection-authority-domain
```

```txt
StoryAnnouncementCommand
  -> bind StoryRevision, SceneRevision, command identity and message kind
  -> resolve one concise authored SemanticMessageDescriptor
  -> exclude interactive controls and debug JSON from live-region ownership
  -> validate priority, duplicate, stale and superseded announcements
  -> coalesce related inspection, clue and completion updates
  -> atomically publish one dedicated status-region projection
  -> publish StoryAnnouncementResult
  -> publish FirstSemanticAnnouncementAck

route and interlude transitions
  -> require accepted scene and interlude results
  -> publish one scene-arrival or terminal message
  -> preserve keyboard focus and control semantics independently
  -> expose deterministic screen-reader fixture evidence
```

## Proposed DSK surfaces

- `the-unmapped-house-story-announcement-semantic-projection-authority-domain`
- `announcement-command-envelope-kit`
- `story-announcement-revision-kit`
- `dedicated-status-region-kit`
- `semantic-message-descriptor-kit`
- `announcement-priority-policy-kit`
- `announcement-coalescing-kit`
- `control-tree-live-region-exclusion-kit`
- `debug-tree-live-region-exclusion-kit`
- `scene-arrival-announcement-kit`
- `inspection-result-announcement-kit`
- `clue-acquired-announcement-kit`
- `scene-completion-announcement-kit`
- `interlude-announcement-kit`
- `route-transition-announcement-kit`
- `terminal-announcement-kit`
- `stale-announcement-rejection-kit`
- `duplicate-announcement-rejection-kit`
- `screen-reader-projection-result-kit`
- `announcement-fixture-matrix-kit`

## Ownership rule

The story domain owns semantic message intent. The DOM adapter owns only projection. Interactive controls, visual debug state and the live message surface must be separate participants with matching revisions and typed results.
