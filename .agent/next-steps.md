# Next steps: The Unmapped House story announcement semantic projection

**Timestamp:** `2026-07-14T22-01-31-04-00`  
**Status:** `audited`

## Summary

The smallest safe change is to remove live-region ownership from the entire story panel and introduce one dedicated status projection driven by accepted story results.

## Plan ledger

**Goal:** produce concise, deterministic and non-duplicated screen-reader feedback without changing the visual game loop.

- [ ] Remove `aria-live` from `#story-panel`.
- [ ] Add one dedicated status element outside the interactive control subtree.
- [ ] Define `StoryAnnouncementRevision` and command identity.
- [ ] Define semantic message kinds for scene, inspection, clue, completion, interlude, route and terminal results.
- [ ] Exclude hotspot controls and Notebook/debug JSON from live announcements.
- [ ] Add priority, coalescing and duplicate suppression.
- [ ] Reject stale and superseded announcement work.
- [ ] Keep focus management under the retained interlude focus authority.
- [ ] Publish `StoryAnnouncementResult`.
- [ ] Publish `FirstSemanticAnnouncementAck`.
- [ ] Correlate the acknowledgement with the visible story revision.
- [ ] Add browser, screen-reader, artifact and Pages fixtures.

## Ordered implementation

### 1. Separate semantic regions

Keep headings, narrative text, controls and debug output stable and directly navigable. Do not make their container live.

### 2. Define authored messages

Create concise messages from accepted domain results rather than serializing arbitrary UI state.

### 3. Add revision and deduplication

Bind each message to story, scene and source-result identities. Coalesce clue and completion messages where appropriate.

### 4. Project through one adapter

The DOM adapter writes only the accepted message into the dedicated status node and returns a typed projection result.

### 5. Prove behavior

Capture accessibility-tree and announcement events for boot, inspection, re-read, completion, route transition and terminal state.

## Do not combine yet

Keep focus/route admission, page lifecycle, persistence, WebGL recovery, viewport, provider admission, hotspot picking and resource lifecycle as retained independent authorities.
