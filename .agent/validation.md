# Validation: The Unmapped House

**Timestamp:** `2026-07-12T10-30-00-04-00`

## Summary

This run changed documentation only. Source inspection proves that every global `keydown` with `event.code === "KeyR"` removes the save key and requests reload without modifier, repeat, trust, focus, confirmation or revision admission.

## Plan ledger

**Goal:** distinguish an explicit confirmed reset from browser refresh and ambiguous keyboard input.

- [x] Inspect the global keydown handler.
- [x] Confirm the predicate checks only `event.code`.
- [x] Confirm `Ctrl+R` and `Meta+R` are not excluded.
- [x] Confirm storage removal occurs before reload.
- [x] Confirm no confirmation, revision or tombstone exists.
- [x] Confirm reset effects and reload have no typed results.
- [x] Confirm current package validation is syntax-only.
- [x] Document pure and browser fixture requirements.
- [ ] Execute fixtures after implementation.

## Proven from source

```txt
SAVE_KEY is the sole durable progress key
a global keydown listener is installed
the listener checks only event.code === KeyR
the listener does not inspect modifier keys
the listener does not inspect repeat or isTrusted
the listener does not inspect focus or visibility
the listener removes SAVE_KEY synchronously
the listener requests location.reload immediately after removal
there is no confirmation UI or capability
there is no expected story/storage revision
there is no reset tombstone
there is no typed reset, storage or reload result
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
browser refresh preserves progress
modifier chord classification
trusted-event or repeat policy
focus and visibility admission
confirmation capability
stale revision rejection
reset tombstone durability
cross-tab stale-writer rejection
timer/runtime retirement ordering
typed storage removal result
reload admission
first clean-frame provenance
```

## Change boundary

```txt
runtime source changed: no
story content changed: no
keyboard behavior changed: no
storage behavior changed: no
timer behavior changed: no
modal or transition behavior changed: no
render behavior changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
```

## Required fixtures

```txt
fixture:plain-r-requires-confirmation
fixture:ctrl-r-rejected-as-refresh
fixture:meta-r-rejected-as-refresh
fixture:refresh-zero-storage-mutation
fixture:repeat-rejected
fixture:untrusted-event-rejected
fixture:hidden-page-rejected
fixture:stale-story-revision-rejected
fixture:stale-storage-revision-rejected
fixture:confirmed-reset-tombstone
fixture:stale-tab-cannot-resurrect
fixture:storage-remove-failure
fixture:timer-retirement-before-reset
fixture:runtime-retirement-before-reload
fixture:first-clean-frame-reset-generation
smoke:browser-refresh-preserves-save
smoke:browser-confirmed-reset-clears-save
smoke:pages-refresh-reset-parity
```

## Current result

```txt
destructive reset authority implemented: no
browser-refresh exclusion proven: no
confirmation proven: no
revision fencing proven: no
reset tombstone proven: no
typed effect result proven: no
first clean-frame proof: no
```

No reset safety, refresh safety, cross-tab deletion durability or post-reset frame claim is made.
