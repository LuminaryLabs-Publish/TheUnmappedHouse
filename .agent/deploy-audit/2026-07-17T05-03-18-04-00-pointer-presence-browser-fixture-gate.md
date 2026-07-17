# Deploy audit: pointer-presence browser fixture gate

**Timestamp:** `2026-07-17T05-03-18-04-00`

## Required fixture matrix

| Fixture | Source | Artifact | Pages |
|---|---:|---:|---:|
| hover hotspot then leave canvas | required | required | required |
| non-zero parallax then leave canvas | required | required | required |
| pointer cancellation | required | required | required |
| window blur and refocus | required | required | required |
| document hidden and visible | required | required | required |
| scene transition with visible hover label | required | required | required |
| stale predecessor pointer sample | required | required | required |
| first neutral pointer frame acknowledgement | required | required | required |

## Pass criteria

```txt
hover label hidden after retirement
hover target null after retirement
camera target neutral or within bounded easing contract
no predecessor-scene label after transition
stale samples rejected
single retirement result per generation
matching PointerProjectionDigest across delivery origins
FirstNeutralPointerFrameAck observed
```

## Current evidence

```txt
npm run check: syntax only
browser pointer-presence fixtures: absent
artifact fixture: absent
Pages fixture: absent
```

No deployed behavior is claimed until the full matrix passes.