# Deploy audit: Inspection and completion fixture gate

Timestamp: `2026-07-11T12-08-47-04-00`

## Goal

Prevent deployment from treating syntax validity as proof that hotspot interaction, completion, persistence, and side-panel/raycast parity are correct.

## Current gate

```txt
npm run check
  -> node --check src/aspect-frame.js
  -> node --check src/game.js
  -> node --check src/stage-kit.js
  -> node --check src/story-data.js
```

The current gate proves only parse validity.

## Missing deploy evidence

```txt
StoryManifest admission
StorySnapshot migration and reconciliation
inspection command admission
stale scene/story/stage rejection
exactly-once inspection receipts
clue grant provenance
scene completion proof
one interlude lease per proof
persistence rollback
side-panel/raycast parity
proof-gated Continue admission
```

## Required Node gate

```txt
node scripts/validate-story-manifest.mjs
node scripts/validate-story-snapshot-admission.mjs
node scripts/validate-inspection-command.mjs
node scripts/validate-stale-inspection.mjs
node scripts/validate-clue-provenance.mjs
node scripts/validate-scene-completion-proof.mjs
node scripts/validate-inspection-persistence-rollback.mjs
node scripts/validate-dual-ingress-parity.mjs
npm run check
```

## Required browser gate

```txt
open scene one
inspect hotspot through button
inspect another through raycast
repeat both through opposite ingress
verify typed duplicate results
complete scene and verify one proof plus one interlude
attempt forged descriptor and verify rejection
advance scene
invoke retained old button closure and stale pick observation
verify both are rejected
reload persisted state
verify receipts, clue provenance, proof, story revision, UI, and debug agree
```

## Required artifact output

```txt
manifest fingerprint
initial and final StorySnapshot fingerprints
inspection command/result journal
inspection receipt set
clue grant provenance set
completion proof
persistence results
button/raycast parity report
browser debug snapshot
```

## Deployment policy

```txt
syntax failure -> fail
manifest or snapshot fixture failure -> fail
inspection authority fixture failure -> fail
completion-proof fixture failure -> fail
persistence rollback failure -> fail
dual-ingress parity failure -> fail
browser stale-work rejection failure -> fail
```

## Current status

```txt
runtime implementation: absent
behavioral fixtures: absent
browser parity smoke: absent
deployment workflow change in this pass: no
```
