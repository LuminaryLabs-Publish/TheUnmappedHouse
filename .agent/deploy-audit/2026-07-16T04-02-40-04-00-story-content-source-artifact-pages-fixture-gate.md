# Deploy audit: story content source, artifact, and Pages fixture gate

**Timestamp:** `2026-07-16T04-02-40-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `story-content-graph-validation-authority-audited`

## Summary

The current package command checks module syntax. It does not validate the authored content graph, and no deployed proof binds Pages to an accepted content revision.

## Plan ledger

**Goal:** prove that source, produced artifact, and public Pages admit the same story revision and reject the same invalid fixtures.

- [x] Identify the current syntax-only command.
- [x] Define validator fixture classes.
- [x] Define artifact and Pages correlation requirements.
- [ ] Add and execute the fixtures.

## Required source fixtures

```txt
valid current manifest -> accepted
duplicate scene ID -> rejected
duplicate hotspot ID -> rejected
unknown completion clue -> rejected
ungrantable completion clue -> rejected
missing initial scene -> rejected
unreachable scene -> rejected
multiple or invalid terminal boundary -> rejected
malformed camera tuple -> rejected
unsupported prop kind -> rejected
non-finite numeric descriptor -> rejected
stale validation result -> rejected at adoption
```

## Required browser fixtures

```txt
valid content -> controls and first validated frame
invalid content -> semantic fallback and no StageKit construction
rejected content -> no hotspot buttons or canvas volumes
accepted revision -> matching DOM, canvas, story and frame identities
```

## Required artifact and Pages evidence

- commit SHA;
- artifact hash and size;
- content revision and schema version;
- validator policy version;
- accepted/rejected result payload;
- route and clue index digest;
- screenshot or DOM snapshot for valid and invalid cases;
- `FirstValidatedStoryFrameAck` for valid content;
- public URL response tied to the same artifact.

## Current gate

```txt
npm run check: syntax only
story validator: absent
artifact content-revision evidence: absent
Pages content-revision evidence: absent
invalid-content fallback smoke: absent
```

No deployment readiness claim is made.
