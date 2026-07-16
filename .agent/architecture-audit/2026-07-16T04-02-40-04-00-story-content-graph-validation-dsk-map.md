# Architecture audit: story content graph validation DSK map

**Timestamp:** `2026-07-16T04-02-40-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `story-content-graph-validation-authority-audited`

## Summary

The existing story and renderer domains accept authored descriptors directly. This map introduces a validation authority between authored content and all runtime consumers.

## Plan ledger

**Goal:** define one parent DSK and the smallest coordinating kits needed to validate and admit story content.

- [x] Preserve story-runtime and render ownership.
- [x] Keep the validator pure and renderer-neutral.
- [x] Separate validation from adoption.
- [x] Separate semantic validation from visible-frame acknowledgement.
- [x] Define deterministic identities, results, and rejection classes.
- [ ] Implement the map.

## Current architecture

```txt
story-data-kit
  -> browser-story-runtime-kit
  -> scene-route / inspection / clue / interlude / terminal kits
  -> scene-descriptor-consumer-kit
  -> stage-render-kit
```

No authority sits between the authored array and these consumers.

## Proposed parent domain

`the-unmapped-house-story-content-graph-validation-authority-domain`

### Identity layer

```txt
story-content-revision-kit
story-schema-version-kit
scene-identity-registry-kit
hotspot-identity-registry-kit
clue-identity-registry-kit
```

Services:

- assign or verify stable content and schema revisions;
- build immutable scene, hotspot, and clue indexes;
- reject empty, duplicate, malformed, or conflicting identities;
- expose normalized lookup tables to downstream consumers.

### Graph layer

```txt
scene-route-order-validation-kit
route-reachability-analysis-kit
clue-grant-index-kit
completion-requirement-satisfiability-kit
```

Services:

- identify the initial scene and authored transition order;
- prove every scene is reachable from the initial scene;
- prove the route terminates exactly once;
- index clue grants by reachable scene/hotspot;
- prove every completion requirement can be satisfied before its transition.

### Descriptor layer

```txt
scene-descriptor-shape-validation-kit
numeric-finiteness-validation-kit
duplicate-identity-rejection-kit
unknown-reference-rejection-kit
```

Services:

- validate camera, stage, layer, prop, hotspot, material, fog, and post shapes;
- validate tuple cardinality and supported prop kinds;
- reject NaN, Infinity, invalid ranges, and missing required values;
- produce exact issue paths.

### Result and presentation layer

```txt
story-content-validation-result-kit
invalid-content-fallback-projection-kit
first-validated-story-frame-ack-kit
source-artifact-pages-content-fixture-kit
```

Services:

- publish one immutable accepted or rejected result;
- gate runtime and renderer adoption on the accepted content revision;
- render a semantic fallback without StageKit when rejected;
- bind accepted content to the first public story frame;
- prove matching behavior in source, artifact, and Pages.

## Commands

```txt
StoryContentValidationCommand
StoryContentAdoptionCommand
ValidatedStoryFrameCommand
```

## Results

```txt
StoryContentAccepted
StoryContentRejectedSchema
StoryContentRejectedDuplicateScene
StoryContentRejectedDuplicateHotspot
StoryContentRejectedUnknownClue
StoryContentRejectedUnsatisfiableCompletion
StoryContentRejectedUnreachableScene
StoryContentRejectedInvalidTerminal
StoryContentRejectedInvalidDescriptor
StoryContentRejectedNonFiniteValue
StoryContentRejectedStale
StoryContentAdopted
StoryContentAdoptionRejected
FirstValidatedStoryFrameAcknowledged
StoryContentArtifactParityConfirmed
```

## Ownership boundary

The validator owns content admissibility, not gameplay truth or rendering. The story runtime still owns state transitions; StageKit still owns presentation. Both consume the same accepted, revision-bound manifest.
