# Deploy audit: Persistence failure and recovery fixture gate

Timestamp: `2026-07-11T00-00-26-04-00`

## Current gate

`npm run check` only syntax-checks:

```txt
src/aspect-frame.js
src/game.js
src/stage-kit.js
src/story-data.js
```

The static deploy can succeed while persistence denial, quota failure, interrupted transitions, startup leaks and reload recovery remain untested.

## Required scripts

```txt
node scripts/validate-story-source.mjs
node scripts/validate-save-reconciliation.mjs
node scripts/validate-story-phase-resume.mjs
node scripts/validate-persistence-results.mjs
node scripts/validate-story-commit-protocol.mjs
node scripts/validate-boot-rollback.mjs
npm run check
```

## Required deterministic storage adapter cases

```txt
normal read/write/clear
missing save
invalid JSON
read access denied
write access denied
quota exceeded
stale expected revision
pending write succeeds and final write fails
clear fails
```

## Required fixture rows

```txt
load-result-distinguishes-invalid-json-from-access-denial
write-result-identifies-quota-failure
failed-inspection-write-schedules-no-interlude
failed-inspection-write-projects-no-success-state
failed-continue-write-keeps-previous-scene
pending-transition-recovers-exactly-once
finalized-transition-reloads-target-scene
reset-clear-failure-does-not-reload
boot-write-failure-releases-render-host
persistence-journal-json-safe-and-bounded
```

## Required browser smoke

```txt
fresh load with working storage
complete scene and reload during interlude pending
reload during interlude open
continue once and verify save/stage revision correlation
simulate write denial before an inspection
simulate quota failure on final inspection
simulate final-write failure during Continue
reload and verify deterministic recovery
simulate clear failure on KeyR
verify one canvas, one RAF chain and one listener set after recovery/remount
```

## Deployment decision

Do not treat a successful static build or Pages upload as persistence proof. The gate should fail before deployment when a command can visibly advance without a committed save revision or when a boot failure leaves active browser resources.

## Current status

```txt
runtime source changed: no
package scripts changed: no
workflow changed: no
persistence result fixture: absent
story commit protocol fixture: absent
boot rollback fixture: absent
browser storage-failure smoke: absent
```