# Committed frame diagnostics DSK map

Timestamp: `2026-07-12T03-21-27-04-00`

## Summary

The renderer needs a composed parent domain that owns frame admission, immutable input, pass execution results, visible acknowledgement and diagnostic projection.

## Plan ledger

**Goal:** define the minimum DSK composition required to turn the current ambient RAF into an observable committed-frame transaction.

- [x] Identify current render entry and two physical passes.
- [x] Identify missing authority inputs.
- [x] Define command, result, observation and fixture kits.
- [ ] Implement after upstream runtime, surface and context identities exist.

## Parent domain

```txt
the-unmapped-house-committed-frame-diagnostics-authority-domain
```

## Composition

```txt
frame-sequence-kit
story-revision-kit
narrative-revision-kit
frame-input-snapshot-kit
render-command-kit
render-admission-kit
stage-pass-result-kit
post-pass-result-kit
frame-commit-result-kit
visible-frame-acknowledgement-kit
canvas-present-observation-kit
frame-correlation-kit
frame-debug-projection-kit
public-frame-readback-kit
stale-frame-rejection-kit
frame-journal-kit
first-frame-fixture-kit
scene-transition-frame-fixture-kit
inspection-frame-parity-fixture-kit
browser-screenshot-correlation-smoke-kit
```

## Input dependencies

```txt
manifest id and version
story snapshot id and revision
narrative projection revision
runtime session id and generation
lifecycle revision
scene resource generation
surface id and revision
WebGL context generation
camera revision
hotspot-set revision
wall-time sample
```

## Transaction

```txt
RenderFrameCommand
  -> validate all generation/revision preconditions
  -> freeze FrameInputSnapshot
  -> execute stage pass
  -> execute post pass
  -> acknowledge final canvas
  -> commit FrameCommitResult
  -> publish detached observation and bounded journal row
```

## Rejection

A stale generation, failed stage pass, failed post pass or missing canvas acknowledgement produces an observable non-commit result and cannot replace the latest committed frame.
