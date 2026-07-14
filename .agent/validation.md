# Validation: The Unmapped House story-save schema and manifest-admission audit

**Timestamp:** `2026-07-13T19-58-19-04-00`  
**Scope:** documentation-only save-admission audit

## Summary

Source and retained audit state were inspected. The audit documents raw-save parsing, shape assumptions, authored-identifier compatibility, startup scene divergence, canonical admission requirements and missing proof. Runtime behavior and deployment were not changed or executed.

## Plan ledger

**Goal:** state exactly what this audit proves and what remains unverified.

- [x] Verify successfully parsed values are shallow-merged without schema validation.
- [x] Verify unknown scene IDs fall back visually without repairing `state.sceneId`.
- [x] Verify reducers assume array and nested-record shapes.
- [x] Verify no schema version or story-manifest fingerprint exists.
- [x] Verify no migration, quarantine or typed admission result exists.
- [x] Verify startup immediately rewrites the admitted object.
- [x] Verify package validation is syntax-only.
- [x] Preserve all 24 implemented kit surfaces and services.
- [x] Refresh machine audit state as valid JSON.
- [x] Change documentation only.
- [ ] Run executable save-admission fixtures after implementation.

## Source checks performed

```txt
full LuminaryLabs-Publish repository inventory compared
all nine eligible central ledger entries reviewed
all nine eligible repository heads compared with recorded documentation heads
src/game.js inspected
src/story-data.js inspected
src/stage-kit.js inspected
src/aspect-frame.js inspected
package.json inspected
retained persistence and viewport audits inspected
root .agent state inspected
```

## Source facts established

```txt
JSON parsing failure falls back, but parsed shape failure does not
parsed fields overwrite initial fields through shallow merge
unknown state.sceneId falls back only for currentScene
state.sceneId is not normalized before immediate writeback
clues consumers require includes and push
inspected consumers require nested object lookup and assignment
route consumers require includes and push
log consumers require unshift and slice
saved identifiers are not checked against current story-data
no schema version, manifest fingerprint, migration or quarantine exists
npm run check performs syntax checks only
```

## Documentation changed

```txt
new tracker and turn-ledger entry
new architecture audit
new render audit
new gameplay audit
new interaction audit
new save-admission contract audit
new deploy fixture gate
new central-sync audit
START_HERE.md refreshed
current-audit.md refreshed
next-steps.md refreshed
known-gaps.md refreshed
validation.md refreshed
kit-registry.json refreshed
```

## Not changed

```txt
runtime JavaScript: no
HTML or CSS: no
story descriptors: no
Three.js provider: no
WebGL rendering: no
browser persistence behavior: no
package scripts: no
dependencies: no
Pages workflow: no
branch: main only
pull request: none
```

## Not executed

```txt
npm run check: not run
pure parser/validator fixtures: unavailable
malformed-save browser fixture: unavailable
manifest-mismatch fixture: unavailable
migration fixture: unavailable
quarantine fixture: unavailable
canonical writeback fixture: unavailable
first admitted-frame fixture: unavailable
built-output smoke: not run
Pages save-admission smoke: not run
```

## Required future proof

```txt
every raw document receives one typed classification
only validated current identifiers reach live state
known predecessor saves migrate deterministically
malformed and incompatible saves are quarantined without partial adoption
canonical admitted state and currentScene commit together
writeback contains only the canonical current envelope
interactions wait for admission and projection readiness
first visible stage, UI and Notebook cite the admitted state revision
source, browser, build and Pages matrices pass
```

No claim is made that schema compatibility, migration, quarantine, canonical writeback, interaction gating or visible-frame proof is implemented.