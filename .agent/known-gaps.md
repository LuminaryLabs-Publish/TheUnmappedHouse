# Known gaps: The Unmapped House

Timestamp: `2026-07-12T03-21-27-04-00`

## Plan ledger

**Goal:** keep story, lifecycle, rendering and committed-frame proof gaps explicit.

- [x] Trace synchronous story/debug projection and asynchronous canvas presentation.
- [x] Confirm no frame sequence, immutable input, pass result or visible acknowledgement exists.
- [x] Confirm screenshots and notebook/debug state cannot cite a committed frame.
- [x] Define frame identity, correlation, observation and fixture gaps.
- [ ] Implement and execute the Committed Frame Diagnostics Authority gate.

## Frame identity gaps

- No frame id or monotonic frame sequence exists.
- RAF callbacks are not associated with a runtime session or generation.
- Frames do not cite scene-resource, surface or WebGL context generations.
- No story, narrative, camera or hotspot-set revision is frozen for a frame.
- No immutable frame-input snapshot exists.

## Pass-result gaps

- The stage render target pass returns no typed result.
- The post/default-framebuffer pass returns no typed result.
- Failures are not classified as rejected, failed or partially submitted.
- No final canvas presentation acknowledgement exists.
- No first-frame receipt exists after startup, inspection or scene transition.

## Story and diagnostics gaps

- `renderUi()` projects notebook/debug state immediately after mutations.
- Debug JSON contains mutable story state but no renderer or frame evidence.
- Successor scene DOM can appear before a successor canvas frame is acknowledged.
- Inspection completion can be reported without a frame that cites the inspection result.
- No public detached frame snapshot or bounded frame journal exists.
- No screenshot artifact can be tied to one committed frame.

## Runtime and resource dependencies

- Runtime session lifecycle and callback leases remain unimplemented.
- Scene-resource generations and ordered retirement remain unimplemented.
- Render-surface revisions remain unimplemented.
- WebGL context generation and recovery remain unimplemented.
- These identities are required inputs to authoritative committed-frame diagnostics.

## Existing upstream gaps

- StoryManifest, StorySnapshot, pointer, inspection, transition and narrative authorities remain unimplemented.
- Raw localStorage effects remain untyped.
- Canvas and side-panel interaction parity remains unproven.
- Scene and narrative commits remain non-atomic.

## Validation gaps

- `npm run check` is syntax-only.
- No fixture drives an actual renderer and captures pass results.
- No fixture verifies first frame after inspection or Continue.
- No fixture compares notebook/debug revision with canvas revision.
- No fixture rejects stale frame results.
- No browser smoke records a screenshot plus frame receipt.
- No deployed readback exposes a committed-frame journal.

## Deferred work

```txt
new story rooms or branches
inventory
audio
renderer replacement
new shader work
camera retuning
visual polish
```
