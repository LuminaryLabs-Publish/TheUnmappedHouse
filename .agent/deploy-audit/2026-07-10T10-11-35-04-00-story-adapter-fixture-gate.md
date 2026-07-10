# Deploy audit — Story adapter fixture gate

## Current pass validation

Docs-only update.

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
DOM-free story fixture: not run because proof files do not exist yet
```

## Available validation

`package.json` exposes `npm run check`, which syntax-checks the current browser modules.

## Missing gate

A DOM-free story adapter fixture should exist before the next implementation is considered safe.

## Required fixture rows

```txt
initial_state_resolved
inspect_accepted
inspect_repeat_no_mutation
inspect_unknown_rejected
inspect_scene_mismatch_rejected
scene_complete
interlude_intent
continue_next_scene
continue_terminal
save_intent
projection_record
stage_load_intent
stage_load_readback
story_adapter_ledger_row
browser_adapter_readback
gamehost_story_diagnostics
```

## Safe validation order

1. Add source-owned story authority files.
2. Add DOM-free fixture.
3. Run `node scripts/validate-story-authority.mjs`.
4. Run `npm run check`.
5. Run browser smoke only after fixture rows exist.
