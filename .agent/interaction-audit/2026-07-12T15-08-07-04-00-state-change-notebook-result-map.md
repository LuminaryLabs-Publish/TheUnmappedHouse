# Interaction audit: State Change to Notebook Result Map

**Timestamp:** `2026-07-12T15-08-07-04-00`

## Summary

Browser interactions currently mutate story state and call `renderUi()` directly. No command/result boundary identifies which mutation authorized the Notebook projection or whether the target channel was player-facing or diagnostic.

## Plan ledger

**Goal:** map each interaction to a committed story result and then to a separately admitted Notebook projection result.

- [x] Map boot, canvas click, side-panel click, re-read and Continue.
- [x] Identify current direct DOM writes.
- [x] Define command and result envelopes.
- [ ] Implement the envelopes.

## Current map

| Interaction | Story mutation | Notebook effect | Result today |
|---|---|---|---|
| Boot | Load/merge state and resolve scene. | Full raw JSON projection. | None. |
| Canvas click | Inspect hotspot, clues, log, completion. | Full raw JSON projection. | None. |
| Side-panel click | Same mutation without raycast evidence. | Full raw JSON projection. | None. |
| Re-read | Log and narrative update. | Full raw JSON projection. | None. |
| Continue | Scene and route update. | Full raw JSON projection. | None. |
| Reset | Delete key and reload. | Recreated raw JSON after boot. | None. |

## Required commands

```txt
NotebookProjectionCommand
  commandId
  sourceMutationId
  expectedStoryRevision
  expectedProjectionRevision
  sceneGeneration
  requestedChannel
  capabilityToken
  redactionProfileId
```

## Required results

```txt
NotebookProjectionResult
  resultId
  commandId
  sourceMutationId
  status
  storyRevision
  priorProjectionRevision
  committedProjectionRevision
  channel
  includedFields
  redactedFields
  omittedFields
  visibleFrameId
```

## Status map

```txt
Committed
Duplicate
RejectedStaleStoryRevision
RejectedStaleProjectionRevision
RejectedChannel
RejectedCapability
RejectedClassification
Redacted
Visible
```

## Interaction invariants

```txt
one story mutation receipt may produce multiple channel-specific projections
player and developer projections have different model fingerprints
a failed diagnostic projection does not fail gameplay
public player projection fails closed on unknown fields
Continue cannot display a predecessor-scene projection
reset generation rejects predecessor projections
visible acknowledgements cite the exact projection result
```

## Gate

The interaction boundary is incomplete while browser handlers can mutate state and directly publish an unclassified diagnostic object into the player Notebook.