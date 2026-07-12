# Validation: The Unmapped House

**Timestamp:** `2026-07-12T15-08-07-04-00`

## Summary

This run changed documentation only. Source inspection proves that the public page always mounts a visible `Notebook` `<pre>` and that `renderUi()` writes a raw JSON serialization of internal game, scene, clue, route, inspection, completion and log fields into it without channel admission, classification, redaction, projection identity or visible-frame proof.

## Plan ledger

**Goal:** distinguish source-backed notebook/diagnostic findings from production-safety claims that require executable browser proof.

- [x] Inspect the Notebook shell in `index.html`.
- [x] Inspect Notebook visibility and `<pre>` styling in `src/styles.css`.
- [x] Inspect aggregate fields written by `renderUi()`.
- [x] Confirm projection occurs at boot, inspection and scene transition.
- [x] Confirm no build, query, role or capability gate exists.
- [x] Confirm no field classification or redaction policy exists.
- [x] Confirm no projection revision or visible-frame acknowledgement exists.
- [x] Document pure and browser fixture requirements.
- [ ] Execute fixtures after implementation.

## Proven from source

```txt
#state-debug is mounted in index.html
#state-debug is inside a section labelled Notebook
.notes and pre are visible in normal page CSS
renderUi writes JSON.stringify output directly to #state-debug
projected fields are game, scene, clues, route, inspected, complete and latest
scene values are internal scene ids
clue values are internal clue ids
inspected values are current-scene internal hotspot booleans
complete is the authoritative scene-completion boolean
renderUi runs during initial boot
renderUi runs after each inspection
renderUi runs after Continue scene transition
no public/player/developer channel distinction exists
no build-channel or capability admission exists
no field classification or redaction profile exists
no projection id or revision exists
no story-revision binding exists
no first-visible notebook frame acknowledgement exists
```

## Important precision boundary

```txt
future requiresToComplete arrays are not directly projected
the current issue is not a claim that every future answer is disclosed
the issue is that acquired internal ids and aggregate structure are unclassified public UI
```

## Existing checks prove

```txt
src/aspect-frame.js parses
src/game.js parses
src/stage-kit.js parses
src/story-data.js parses
```

## Existing checks do not prove

```txt
player-versus-developer channel separation
build-channel admission
diagnostic capability admission
field classification
redaction and internal-id mapping
stale story/projection rejection
typed projection results
public Pages omission of developer diagnostics
visible frame provenance
```

## Change boundary

```txt
runtime source changed: no
story content changed: no
notebook behavior changed: no
diagnostic behavior changed: no
render behavior changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
browser notebook smoke: not run
Pages notebook smoke: not run
```

## Required fixtures

```txt
fixture:public-player-notebook-only
fixture:developer-capability-required
fixture:developer-field-rejected-in-public-channel
fixture:internal-id-redaction
fixture:unknown-field-classification-rejected
fixture:stale-story-revision-rejected
fixture:stale-projection-revision-rejected
fixture:independent-player-and-diagnostic-models
fixture:detached-projection-result
fixture:bounded-projection-journal
fixture:first-visible-notebook-frame
smoke:browser-notebook-channel-matrix
smoke:pages-public-build-no-unadmitted-debug-json
```

## Current result

```txt
notebook projection authority implemented: no
player/developer channel separation proven: no
field classification proven: no
redaction proven: no
public-build diagnostic exclusion proven: no
first visible notebook frame proof: no
```

No production-safe notebook, diagnostic-channel or deployment-readiness claim is made.