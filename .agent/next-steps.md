# Next steps: The Unmapped House

**Timestamp:** `2026-07-12T13-08-15-04-00`

## Goal

Preserve the current three-scene story and anime-horror presentation while making content, persistence, interaction, lifecycle and render-surface behavior deterministic, bounded and observable.

## Plan ledger

### 1. Canonical StoryManifest
- [ ] Add stable manifest identity, versions, indexes, validation, freeze and fingerprint.

### 2. Versioned StorySnapshot startup authority
- [ ] Replace raw object spread with typed parse, migration, reconciliation and startup results.

### 3. Browser storage and reset authority
- [ ] Add writer identity, monotonic revisions, expected-predecessor checks and conflict policy.
- [ ] Replace raw `KeyR` deletion with confirmed reset admission and a durable tombstone.

### 4. Interaction and progression authority
- [ ] Unify canvas and side-panel activation around canonical id-only commands.
- [ ] Record immutable inspection receipts and derive one scene-completion proof.
- [ ] Replace raw completion timers with identity, generation, leases and stale rejection.
- [ ] Make modal controls inert while closed and require a current completion proof.
- [ ] Atomically commit successor story, stage, narrative and persistence candidates.

### 5. Narrative and lifecycle authority
- [ ] Make DOM and aria-live output consume one typed revisioned projection.
- [ ] Add session identity, callback leases, resource generations and ordered disposal.

### 6. Render Surface Resolution Authority
- [ ] Add `RenderSurfaceId`, surface revision and resize generation.
- [ ] Create a pure viewport, DPR, pixel-budget and sample-budget planner.
- [ ] Query texture, renderbuffer and sample limits before allocation.
- [ ] Remove the fixed-design predecessor allocation before live viewport admission.
- [ ] Prepare renderer and offscreen-target candidates before commit.
- [ ] Read back actual drawing-buffer and target dimensions.
- [ ] Check framebuffer completeness.
- [ ] Reject stale resize observations.
- [ ] Roll back failed allocations without mixing renderer and target revisions.
- [ ] Retire predecessor target resources exactly once.
- [ ] Publish detached surface observations and a bounded journal.
- [ ] Acknowledge the first visible frame for each committed surface revision.

### 7. WebGL Context Recovery Authority
- [ ] Coordinate context loss, restoration and replacement resource generations.

### 8. Committed Frame Diagnostics Authority
- [ ] Commit public frame state only after visible canvas acknowledgement.

## Render-surface command contract

```txt
ViewportObservation
  observationId
  resizeGeneration
  expectedSurfaceRevision
  cssWidth
  cssHeight
  requestedDevicePixelRatio
  sourceKind
  observedAtMs
```

```txt
RenderSurfacePlan
  planId
  expectedSurfaceRevision
  cssWidth
  cssHeight
  requestedDpr
  appliedDpr
  physicalWidth
  physicalHeight
  sampleCount
  pixelBudget
  sampleBudget
  capabilityFingerprint
  fallbackTier
```

```txt
RenderSurfaceResult
  resultId
  planId
  status
  priorSurfaceRevision
  committedSurfaceRevision
  actualDrawingBufferWidth
  actualDrawingBufferHeight
  actualTargetWidth
  actualTargetHeight
  framebufferStatus
  rollbackResult
  retirementResult
  firstVisibleFrameId
```

## Required fixture rows

```txt
boot-uses-one-admitted-surface-plan
mobile-viewport-avoids-fixed-design-preallocation
1920x1080-dpr1-commits
1920x1080-dpr2-within-budget-commits
3840x2160-dpr2-downscales-to-budget
texture-limit-plan-rejected-or-fallback
renderbuffer-limit-plan-rejected-or-fallback
sample-limit-plan-rejected-or-fallback
zero-and-nonfinite-dimensions-rejected
rapid-resize-coalesces-to-newest-generation
stale-resize-rejected
allocation-failure-preserves-predecessor
framebuffer-incomplete-rolls-back
replaced-target-retired-once
actual-dimensions-match-committed-plan
first-visible-frame-cites-surface-revision
surface-observation-detached
surface-journal-bounded
```

## Implementation order

```txt
1. StoryManifest Authority
2. StorySnapshot Startup Authority
3. Browser Storage and Reset Authority
4. Interaction and Progression Authorities
5. Narrative and Runtime Lifecycle Authorities
6. Render Surface Resolution Authority
7. WebGL Context Recovery Authority
8. Committed Frame Diagnostics Authority
```

## Do not do first

```txt
new story rooms or branches
inventory
audio or voice work
renderer replacement
shader redesign
camera retuning
visual polish
```

The next render-specific implementation should begin with a pure surface planner and fixture matrix before changing Three.js allocation behavior.