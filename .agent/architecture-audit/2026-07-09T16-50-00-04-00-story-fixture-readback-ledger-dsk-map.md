# Architecture Audit: Story Fixture Readback Ledger DSK Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T16-50-00-04-00`

## Summary

`TheUnmappedHouse` currently has a simple but overloaded architecture: `src/game.js` is both story authority and browser adapter, while `src/stage-kit.js` is a stable visual renderer. The next architectural cut should extract source-owned story command/result fixtures without changing the public route.

## Current module map

```txt
index.html
  -> static page shell and DOM mounts
src/aspect-frame.js
  -> fixed 16:9 frame math
src/story-data.js
  -> source story descriptors
src/stage-kit.js
  -> Three.js fixed-camera renderer and hotspot picking
src/game.js
  -> browser app runtime, story mutation, save, route, interlude, DOM, debug, reset
package.json
  -> syntax-only check script
```

## Current authority ownership

```txt
story source:             src/story-data.js
story command authority:  src/game.js
story state mutation:     src/game.js
save authority:           src/game.js
route authority:          src/game.js
interlude authority:      src/game.js
browser adapter:          src/game.js
stage render authority:   src/stage-kit.js
debug projection:         src/game.js
validation gate:          package.json / syntax-only npm run check
```

## DSK/domain breakdown

| Domain | Current owner | Current service | Gap | Next DSK cut |
|---|---|---|---|---|
| static page shell | `index.html` | mounts app UI and module entry | no issue | keep stable |
| aspect frame | `src/aspect-frame.js` | deterministic 16:9 layout | no issue | keep stable |
| story source | `src/story-data.js` | rooms, hotspots, clues, stage descriptors | no manifest/fingerprint | `story-source-manifest-kit` |
| story state | `src/game.js` | mutable state object | no state snapshot contract | `story-state-snapshot-kit` |
| story command | `src/game.js` | inspect/continue/reset side effects | no command envelope | `story-command-envelope-kit` |
| command validation | implicit branches | scene/hotspot checks | no preflight reason matrix | `story-preflight-kit` |
| command result | implicit DOM/save effects | mutation plus render | no accepted/rejected/no-op result | `story-command-result-kit` |
| event ledger | `writeLog()` | latest eight notebook entries | no event records | `story-event-record-kit` |
| reducer | `inspectHotspot()` / `nextScene()` | mutates module state | not DOM-free | `story-reducer-kit` |
| story projection | `renderUi()` | title/text/buttons/debug | not source-owned | `story-projection-kit` |
| save projection | `saveState()` | localStorage write | no intent/readback | `save-projection-kit` |
| interlude projection | `showInterlude()` / `setTimeout()` | overlay DOM mutation | no deterministic intent | `interlude-projection-kit` |
| stage projection | `stage.loadScene()` | loads render descriptor | no readback report | `stage-projection-kit` |
| browser adapter | `src/game.js` | mutates DOM, localStorage, StageKit | no plan/readback boundary | `browser-adapter-plan-kit` |
| host diagnostics | debug pre only | ad hoc JSON | no stable host state | `gamehost-story-diagnostics-kit` |
| repo ledger | `.agent` docs | human-readable audit state | no fixture proof | `repo-local-ledger-readback-kit` |
| central ledger | `LuminaryLabs-Dev/LuminaryLabs` | central repo tracking | no fixture proof | `central-ledger-readback-kit` |

## Current interaction loop

```txt
browser event
  -> inspectHotspot() or nextScene()
  -> direct state mutation
  -> direct DOM mutation
  -> direct StageKit load call
  -> direct localStorage save
  -> debug JSON projection
```

## Target interaction loop

```txt
browser event
  -> command envelope
  -> source/state/stage snapshots
  -> preflight
  -> reducer result
  -> event/projection/save/interlude/stage intents
  -> browser adapter plan
  -> adapter mutation
  -> adapter readback
  -> host diagnostics
  -> fixture row
```

## Main architectural finding

StageKit should not be rewritten first. It is already a bounded render kit.

The overloaded surface is `src/game.js`, and the safe cut is additive source authority modules that `src/game.js` can call while preserving current behavior.

## Required next source files

```txt
src/story-source-manifest.js
src/story-snapshots.js
src/story-commands.js
src/story-preflight.js
src/story-results.js
src/story-reducer.js
src/story-projections.js
src/browser-adapter-plan.js
tests/fixtures/story-command-results.mjs
```

## Compatibility constraints

```txt
keep index.html route stable
keep SAVE_KEY stable
keep scene ids stable
keep hotspot ids stable
keep visible copy stable
keep StageKit picking stable
keep fixed 16:9 frame stable
keep KeyR reset behavior unless wrapped additively
keep debug panel visible
```
