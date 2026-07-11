# Scene transition audit: story, stage, and persistence atomicity contract

Timestamp: `2026-07-11T13-49-30-04-00`

## Goal

Define the prepare, persist, commit, acknowledge, retire, and rollback boundaries for one scene transition.

## Required transaction

```txt
admit Continue command and unconsumed completion proof
  -> reserve transition id
  -> build successor StorySnapshot candidate
  -> prepare successor stage in detached ownership
  -> validate complete resource inventory
  -> persist candidate with typed result
  -> atomically swap story and stage authority
  -> advance story revision and stage epoch
  -> publish committed transition result
  -> acknowledge first visible successor frame
  -> retire predecessor resources
  -> finalize proof consumption
```

## Failure policy

```txt
admission failure
  -> no mutation

preparation failure
  -> dispose candidate resources
  -> predecessor remains authoritative

persistence failure
  -> dispose candidate resources
  -> predecessor story, stage, DOM, and save remain authoritative

commit failure
  -> restore predecessor authority or enter explicit recoverable state
  -> publish rollback result

frame acknowledgement failure
  -> retain predecessor resources until recovery policy resolves
```

## Invariants

- One completion proof can authorize at most one committed transition.
- One transition advances at most one scene.
- Story revision and stage epoch advance together.
- Live DOM must project only committed story state.
- Candidate resources never enter the active raycast set before commit.
- Predecessor resources are not disposed before successor-frame acknowledgement.
- Terminal completion is a persisted story phase, not copy-only projection.