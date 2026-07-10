# Deploy audit: story source and save fixture gate

Timestamp: `2026-07-10T19-00-19-04-00`

## Current gate

`npm run check` only performs JavaScript syntax checks for four source files. GitHub Pages deploys from `main`, so syntactically valid changes to story data, save handling, command routing or completion policy can ship without proving source integrity or save compatibility.

## Required pre-deploy gate

```txt
node scripts/validate-story-manifest.mjs
node scripts/validate-save-reconciliation.mjs
node scripts/validate-story-command-authority.mjs
node scripts/validate-completion-proof.mjs
node scripts/validate-source-save-render-identity.mjs
npm run check
```

## Required fixture matrix

### Source manifest

```txt
current source valid
stable manifest id and source fingerprint
unique scene and hotspot ids
all grants and requirements resolve
route graph valid
invalid source rows deterministic
```

### Save reconciliation

```txt
empty save
current save
legacy raw payload
malformed JSON
wrong field types
unknown ids
stale source fingerprint
future schema version
content removal or rename
terminal round trip
```

### Story command

```txt
side-panel accepted
raycast accepted
input parity
repeat read
wrong scene
unknown hotspot
stale source
stale stage epoch
```

### Completion

```txt
incomplete before required inspections
newly complete after canonical inspections
injected clue ignored
one completion proof
one interlude effect
stale effect rejected
```

### Source/save/render identity

```txt
save scene repaired before render
manifest fingerprint reaches StageKit request
hotspot mesh stores canonical reference
pick resolves through current manifest
persisted, resolved and rendered scene ids match
```

## Deployment assertions

- Current three-scene story source validates.
- Current visible behavior and copy remain unchanged.
- Every accepted save becomes canonical before gameplay or rendering.
- Repair, migration, reset and rejection outcomes are explicit and JSON-safe.
- No command mutation accepts a live descriptor object as authority.
- Clues and completion are derived from canonical inspections.
- Render and pick observations carry source identity.
- The prior atomic StageKit/resource-lifetime gate remains required after this boundary.

## Current validation status

Documentation-only. Runtime source, package scripts and workflow files were not changed. The fixture scripts do not exist, so no new gate was executed or claimed.
