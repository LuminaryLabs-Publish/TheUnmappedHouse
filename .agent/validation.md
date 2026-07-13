# Validation: The Unmapped House

**Timestamp:** `2026-07-12T20-51-16-04-00`  
**Scope:** documentation-only progression and interlude audit

## Summary

Source inspection was completed and the documentation/registry state was updated. Runtime behavior, story content, rendering and deployment were not modified or executed.

## Plan ledger

**Goal:** state exactly what this run proves and what remains unverified.

- [x] Verify the current source paths and package scripts.
- [x] Verify the three-scene and nine-hotspot authored topology.
- [x] Trace hidden Continue, completion timer, reload and terminal paths.
- [x] Validate `.agent/kit-registry.json` as JSON before publication.
- [x] Change documentation only.
- [ ] Run executable browser progression fixtures after implementation.

## Source checks performed

```txt
index.html inspected
src/styles.css inspected
src/game.js inspected
src/story-data.js inspected
src/stage-kit.js inspected
src/aspect-frame.js inspected
package.json inspected
.github/workflows/deploy.yml inspected
existing root .agent state inspected
central repo ledger inspected
```

## Source facts established

```txt
Continue button is always mounted
closed interlude uses opacity and pointer-events only
Continue is not disabled, hidden or made inert
nextScene has no completion or phase check
completion uses an unowned 450 ms setTimeout
callback reads mutable currentScene at execution
save state contains no progression phase or terminal result
boot does not reopen a complete scene's interlude
showInterlude does not transfer focus or inert underlying controls
```

## Not changed

```txt
runtime JavaScript: no
HTML or CSS: no
story descriptors: no
Three.js rendering: no
browser save format: no
package scripts: no
dependencies: no
Pages workflow: no
```

## Git policy

```txt
target repository: LuminaryLabs-Publish/TheUnmappedHouse
target branch: main
branch created: no
pull request created: no
```

## Not executed

```txt
npm run check: not run
browser keyboard/focus smoke: not run
timer/reload smoke: not run
GitHub Pages progression smoke: not run
accessibility tree inspection: not run
```

## Required future proof

```txt
hidden Continue cannot be focused or activated
incomplete Continue returns rejected
stale timer cannot open a successor interlude
reload after completion restores one visible continuation path
open interlude makes background controls inert
duplicate Continue advances exactly once
terminal state survives reload
visible frame cites committed scene and phase revisions
```

No claim is made that these defects are repaired.
