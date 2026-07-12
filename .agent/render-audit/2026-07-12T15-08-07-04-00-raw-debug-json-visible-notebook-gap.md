# Render audit: Raw Debug JSON Visible Notebook Gap

**Timestamp:** `2026-07-12T15-08-07-04-00`

## Summary

The public frame always contains a visible Notebook surface whose content is raw internal-state JSON. The render path has no projection revision or visible acknowledgement linking that text to an admitted player or developer model.

## Plan ledger

**Goal:** make every visible Notebook frame cite one committed and channel-admitted projection.

- [x] Confirm `#state-debug` is mounted in the normal page shell.
- [x] Confirm CSS makes the Notebook visible and scrollable.
- [x] Confirm `renderUi()` replaces its text directly.
- [x] Confirm the Three.js frame loop publishes no notebook provenance.
- [ ] Add visible projection receipts.

## Current visible path

```txt
renderUi()
  -> JSON.stringify(internal aggregate subset)
  -> debug.textContent assignment
  -> browser paints Notebook independently of Three.js frame
  -> no projection/frame result
```

## Visible fields

```txt
game title
internal scene id
acquired internal clue ids
route ids
inspection booleans
exact completion boolean
recent log entries
```

## Render gap

The browser can display a new Notebook state before or after an unrelated canvas frame, but neither surface cites:

```txt
story revision
scene generation
projection revision
channel
redaction profile
DOM commit id
browser paint/frame id
```

## Required visible-frame contract

```txt
VisibleNotebookFrameAck
  frameId
  notebookSurfaceId
  projectionId
  projectionRevision
  storyRevision
  sceneGeneration
  channel
  redactionProfileId
  modelFingerprint
  observedAtMs
```

## Proof matrix

```txt
initial boot player notebook
first inspection player notebook
re-read inspection player notebook
scene completion player notebook
Continue successor notebook
developer diagnostics admitted
public build developer diagnostics rejected
stale projection does not become visible
```

## Gate

A DOM screenshot does not prove the notebook channel, redaction profile or source story revision. Release proof requires a typed projection result and a corresponding visible-frame acknowledgement.