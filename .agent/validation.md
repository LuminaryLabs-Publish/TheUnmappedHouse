# Validation: The Unmapped House custom-material lighting and shadow audit

**Timestamp:** `2026-07-17T10-16-33-04-00`  
**Scope:** documentation-only architecture, render, gameplay, interaction, lighting-shadow and deployment audit

## Summary

Source and retained audit state were inspected. The audit establishes that Three.js scene lights and shadow configuration are not consumed by the visible custom anime material, which uses a fixed `lightDir` uniform. No runtime source was changed and no executable browser or performance proof was run.

## Checklist

- [x] Compare all 11 accessible Publish repositories.
- [x] Exclude TheCavalryOfRome and account for ten eligible repositories.
- [x] Confirm all ten eligible repositories have central ledgers and root `.agent` state.
- [x] Confirm all ten eligible `main` heads match documented repo-local heads.
- [x] Select only TheUnmappedHouse by oldest synchronized timestamp.
- [x] Read `index.html`, `src/game.js`, `src/stage-kit.js`, `src/story-data.js`, `src/styles.css`, `package.json` and current `.agent` routing/registry records.
- [x] Identify the complete interaction loop, all domains, all 24 kits and their services.
- [x] Trace renderer shadow enablement, lights, caster/receiver flags and custom shader inputs.
- [x] Add the timestamped tracker and audit family.
- [x] Refresh all required root `.agent` files.
- [x] Change no runtime, shader, light, shadow, story, persistence, package or deployment behavior.
- [x] Create no branch or pull request.

## Changed

```txt
documentation: yes
runtime JavaScript: no
HTML/CSS/story content: no
custom shaders: no
scene lights and shadows: no
interaction and gameplay: no
persistence: no
packages and dependencies: no
tests and workflows: no
deployment: no
```

## Not run

```txt
npm run check
browser lighting fixtures
shadow receiver fixtures
frame/GPU cost observations
production artifact smoke
Pages lighting smoke
```

## Claims not made

No visible lighting defect, shadow correctness, performance regression, performance improvement, artifact parity, Pages parity or production readiness is claimed.