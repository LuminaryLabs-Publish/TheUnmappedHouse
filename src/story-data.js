export const gameTitle = "The Unmapped House";

export const scenes = [
  {
    id: "library-blank-map",
    title: "The Blank Square",
    openingText: "The school library is closed. Rain taps the windows with the patience of a thing that has all night.",
    backgroundColor: "#171826",
    fog: 0.012,
    camera: { position: [0, 2.25, 8.2], lookAt: [0, 1.35, 0], fov: 38 },
    stage: {
      layers: [
        { size: [13, 6.5], position: [0, 2.4, -3.8], material: { colors: ["#463b38", "#1d1d2a", "#8d7347"], scale: 0.08 } },
        { size: [4.2, 2.7], position: [3.7, 2.35, -3.72], material: { colors: ["#253044", "#101622", "#7da4c9"], scale: 0.16 } }
      ],
      props: [
        { kind: "box", size: [2.8, 0.18, 1.55], position: [0, 0.74, 1.15], material: { colors: ["#4e3321", "#2a1c16", "#a87b50"], scale: 0.12 } },
        { kind: "box", size: [1.1, 0.05, 0.7], position: [-0.55, 0.86, 1.05], rotation: [0.05, 0.18, 0.0], material: { colors: ["#e4d5b8", "#877658", "#f7edcf"], scale: 0.22 } },
        { kind: "box", size: [0.08, 0.08, 0.95], position: [0.34, 0.93, 1.0], rotation: [0.1, 0.0, -0.7], material: { colors: ["#2c2b31", "#0d0e13", "#d8b36b"], scale: 0.5 } },
        { kind: "box", size: [1.7, 3.4, 0.38], position: [-4.2, 1.65, -2.5], material: { colors: ["#3e2d22", "#1e1714", "#856142"], scale: 0.09 } },
        { kind: "box", size: [1.7, 3.4, 0.38], position: [-2.2, 1.65, -2.5], material: { colors: ["#473223", "#211714", "#9b6d3d"], scale: 0.09 } }
      ]
    },
    post: { grain: 0.16, vignette: 0.34, chromatic: 0.0008, distortion: 0.002, memory: 0.08 },
    hotspots: [
      {
        id: "map",
        label: "Inspect the blank map",
        position: [-0.55, 0.98, 1.02],
        size: [1.25, 0.18, 0.9],
        text: "The blank square is not empty. It is avoiding the ink.",
        grants: ["clue:blank-square"],
        changesText: "A pencil line appears without touching the page."
      },
      {
        id: "window",
        label: "Study the window reflection",
        position: [3.7, 2.35, -3.6],
        size: [4.2, 2.7, 0.16],
        text: "The window reflects a front door behind Nara. There is no door behind Nara.",
        grants: ["clue:house-door"]
      },
      {
        id: "shelf-gap",
        label: "Look between the shelves",
        position: [-3.15, 1.65, -2.08],
        size: [0.55, 2.9, 0.5],
        text: "The gap is deeper than the wall. Something inside it smells like carpet after rain.",
        grants: ["clue:deep-shelf"]
      }
    ],
    requiresToComplete: ["clue:blank-square", "clue:house-door", "clue:deep-shelf"],
    interludeTitle: "Map update",
    interludeText: "The square gains four walls. One of them is too close."
  },
  {
    id: "repeating-hallway",
    title: "The Hallway That Repeats",
    openingText: "The second-floor hallway is longer than yesterday. The same window passes three times.",
    backgroundColor: "#111724",
    fog: 0.018,
    camera: { position: [0, 1.9, 9.8], lookAt: [0, 1.28, -1.7], fov: 34 },
    stage: {
      layers: [
        { size: [6, 4.6], position: [0, 2.2, -5.2], material: { colors: ["#2c3442", "#0f131d", "#7b8592"], scale: 0.07 } },
        { size: [13, 0.2], position: [0, 0.32, -1.8], rotation: [-1.5708, 0, 0], material: { colors: ["#394054", "#1b202d", "#7d6f55"], scale: 0.1 } }
      ],
      props: [
        { kind: "box", size: [1.2, 2.5, 0.2], position: [-2.2, 1.55, -3.8], material: { colors: ["#4e372b", "#211817", "#8d6750"], scale: 0.12 } },
        { kind: "box", size: [1.2, 2.5, 0.2], position: [2.25, 1.55, -3.8], material: { colors: ["#4e372b", "#211817", "#8d6750"], scale: 0.12 } },
        { kind: "box", size: [0.95, 0.7, 0.08], position: [0, 1.72, -4.95], material: { colors: ["#dbd8c9", "#7c7a70", "#ffffff"], scale: 0.22 } },
        { kind: "box", size: [0.55, 0.8, 0.06], position: [-3.15, 2.05, -3.95], material: { colors: ["#c9b69a", "#594435", "#e6d5b5"], scale: 0.18 } }
      ]
    },
    post: { grain: 0.18, vignette: 0.45, chromatic: 0.0015, distortion: 0.006, memory: 0.2 },
    hotspots: [
      {
        id: "wrong-door",
        label: "Inspect the extra door",
        position: [-2.2, 1.55, -3.6],
        size: [1.3, 2.6, 0.3],
        text: "The door number is written in pencil. It is Nara's home address.",
        grants: ["clue:home-address"]
      },
      {
        id: "class-number",
        label: "Check the repeated classroom number",
        position: [0, 1.72, -4.75],
        size: [1.0, 0.75, 0.3],
        text: "The number repeats until the paint becomes thick. Under it is wallpaper.",
        grants: ["clue:wallpaper"]
      },
      {
        id: "unfinished-photo",
        label: "Look at the unfinished photo",
        position: [-3.15, 2.05, -3.76],
        size: [0.7, 0.9, 0.25],
        text: "A family stands in a hallway. Their faces stop at the eyes.",
        grants: ["clue:unfinished-family"]
      }
    ],
    requiresToComplete: ["clue:home-address", "clue:wallpaper", "clue:unfinished-family"],
    interludeTitle: "Field note",
    interludeText: "Every repeated hallway contains one thing that belongs inside a house."
  },
  {
    id: "closet-weather",
    title: "The Closet With Weather Inside",
    openingText: "The janitor's closet breathes under the door. Inside, a bucket holds a small storm.",
    backgroundColor: "#0e1219",
    fog: 0.024,
    camera: { position: [0, 1.85, 6.6], lookAt: [0, 1.2, -0.3], fov: 42 },
    stage: {
      layers: [
        { size: [7.5, 4.8], position: [0, 2.1, -3.0], material: { colors: ["#2d312e", "#111412", "#6a6f64"], scale: 0.12 } },
        { size: [7.5, 0.2], position: [0, 0.18, -0.4], rotation: [-1.5708, 0, 0], material: { colors: ["#252a2d", "#0c0f12", "#70777b"], scale: 0.15 } }
      ],
      props: [
        { kind: "cylinder", radiusTop: 0.55, radiusBottom: 0.7, height: 0.9, position: [0, 0.65, -0.7], material: { colors: ["#2d7f96", "#102d3b", "#baf7ff"], scale: 0.28 } },
        { kind: "box", size: [0.14, 2.8, 0.14], position: [-1.8, 1.4, -1.2], rotation: [0, 0, 0.12], material: { colors: ["#564a36", "#221b13", "#c0a36b"], scale: 0.16 } },
        { kind: "box", size: [1.4, 0.08, 0.42], position: [1.4, 1.2, -1.6], material: { colors: ["#ad9d8a", "#493e34", "#e1d3be"], scale: 0.18 } },
        { kind: "box", size: [0.9, 0.06, 0.65], position: [-0.8, 0.9, 0.2], material: { colors: ["#e8e1cc", "#7d735e", "#ffffff"], scale: 0.24 } }
      ]
    },
    post: { grain: 0.22, vignette: 0.52, chromatic: 0.0025, distortion: 0.012, memory: 0.36 },
    hotspots: [
      {
        id: "bucket-storm",
        label: "Look into the bucket",
        position: [0, 0.95, -0.7],
        size: [1.4, 1.0, 1.4],
        text: "Rain turns in a circle. It does not fall. It waits.",
        grants: ["clue:stored-rain"]
      },
      {
        id: "wet-shadow",
        label: "Touch the wet shadow",
        position: [1.4, 1.2, -1.45],
        size: [1.55, 0.35, 0.6],
        text: "The shadow is cold. The shelf above it is dry.",
        grants: ["clue:wet-shadow"]
      },
      {
        id: "closet-map",
        label: "Read the peeling map label",
        position: [-0.8, 0.9, 0.2],
        size: [1.05, 0.35, 0.75],
        text: "A label curls from the paper: 'Utility Room, west wing.' The school has no west wing.",
        grants: ["clue:west-wing"]
      }
    ],
    requiresToComplete: ["clue:stored-rain", "clue:wet-shadow", "clue:west-wing"],
    interludeTitle: "The first rule",
    interludeText: "The house is not appearing. It is being recognized."
  }
];
