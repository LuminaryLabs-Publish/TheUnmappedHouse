# Deploy audit: scene-entry copy source, artifact and Pages fixture gate

**Timestamp:** `2026-07-16T16-58-39-04-00`

## Summary

The repository's validation script checks JavaScript syntax only. It cannot prove that every scene transition presents the successor opening copy or that source, deployed artifact and Pages behavior match.

## Plan ledger

**Goal:** define executable gates for scene-entry narrative convergence at every delivery surface.

- [x] Record the current syntax-only check.
- [x] Define deterministic source fixtures.
- [x] Define browser frame fixtures.
- [x] Define source/artifact/Pages parity.
- [ ] Implement and run the fixtures.

## Required fixtures

```txt
boot scene 1 shows scene 1 openingText
complete scene 1 and Continue shows scene 2 openingText
complete scene 2 and Continue shows scene 3 openingText
successor title, text, stage and hotspot set share one scene ID
previous hotspot text is absent from first successor frame
same-scene UI refresh preserves current-scene inspection text
reload policy is explicit and deterministic
stale scene-entry result is rejected
FirstSceneEntryFrameAck references matching revisions
```

## Delivery matrix

| Surface | Required proof |
|---|---|
| Source server | Direct transition fixture and DOM assertions |
| Built/staged artifact | Same transition sequence and scene-entry digest |
| GitHub Pages | Same title, opening copy, stage and hotspot convergence |

## Gate

Do not claim scene-entry narrative correctness until all three scenes pass the uninterrupted transition sequence at source, artifact and Pages origins with matching scene-entry results.