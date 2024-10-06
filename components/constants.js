export const planetList = [
  {
    type: "Planet",
    imgSrc: "/home/planet.png",
    imgSize: 250,
    description: "Ocean world outside the habitable zone in solar system",
    colour: "blue1",
  },
  {
    type: "Rogue planet",
    imgSrc: "/home/rogue.png",
    imgSize: 270,
    description: "Ocean world without a star",
    colour: "blue3",
  },
  {
    type: "Moon",
    imgSrc: "/home/moon.png",
    imgSize: 180,
    description: "Icy moon of a gas giant",
    colour: "blue2",
  },
]

export const inputsElements = [
  {
    description: "These elements increase the intensity of volcanism on the planet and are responsible for gas emissions into the water",
    inputs: [
      {
        name: "Silicon and Oxygen",
        colour: "#cad9e3"
      },
      {
        name: "Sulfur",
        colour: "#e4b361"
      },
      {
        name: "Carbon",
        colour: "#4f6d7a"
      }
    ]
  },
  {
    description: "These elements lower the intensity of volcanism on the planet, but make it more metallic",
    inputs: [
      {
        name: "Iron and Magnesium",
        colour: "#7d4848"
      },
    ]
  },
  {
    description: "Increases overall volcanic activity on the planet",
    inputs: [
      {
        name: "Titanium",
        colour: "#a6a6a6"
      },
    ]
  },
  {
    description: "Elongates planets volcanic period",
    inputs: [
      {
        name: "Radioactive elements",
        colour: "#c1ff72"
      },
    ]
  },
  {
    description: "These might be important for life existence",
    inputs: [
      {
        name: "Ammonia",
        colour: "#bd9ddb"
      },
      {
        name: "Methane",
        colour: "#7299d1"
      },
      {
        name: "Phosphorus",
        colour: "#e18f5d"
      },
      {
        name: "Nitrogen",
        colour: "#62759c"
      },
    ]
  },
]

export const inputsOther = [
  {
    description: "It dictates amount of radiation that planet receives",
    inputs: [
      {
        name: "Distance from the sun",
        colour: "#56a3a6"
      },

    ]
  },
  {
    description: "It dictates forces acting on water and air on global scale",
    inputs: [
      {
        name: "Rotational period",
        colour: "#56a3a6"
      },

    ]
  },
  {
    description: "It corresponds with planets internal heat = volcanic activity",
    inputs: [
      {
        name: "Age",
        colour: "#56a3a6"
      },
    ]
  },
  {
    description: "It has an influence on every characteristic of a planet",
    inputs: [
      {
        name: "Mass",
        colour: "#56a3a6"
      },
    ]
  },
]

export const defaultValues = {};
export const colours = {};
for (const group of inputsElements.concat(inputsOther)) {
  for (const input of group.inputs) {
    defaultValues[input.name] = 0.5;
    colours[input.name] = input.colour;
  }
}

export const overlayOptions = {
  "Temperature at a seabed": false,
  "Pressure at a seabed": false,
  "Volcanic activity hotspots": false,
  "Life appearances": false,
}

export const lifeforms = [
  {
    name: "Silicon",
    imgSrc: "/life/silicon.png",
    description: "Needs Silicon and Oxygen in order to spawn. Can sustain high pressures and requires 400 deg minimum."
  },
  {
    name: "Nitrogen",
    imgSrc: "/life/nitrogen.png",
    description: "Needs Oxygen and Nitrogen or Ammonia to spawn. Needs 0 - 300 deg temperature range. Cannot sustain high pressures."
  },
  {
    name: "Sulphur",
    imgSrc: "/life/sulphur.png",
    description: "Needs Oxygen and Sulfur in order to spawn. Needs 100-500 deg temperature range. Can create localised acidic environments."
  },
  {
    name: "Titanium",
    imgSrc: "/life/titanium.png",
    description: "Needs Oxygen and Titanium in order to spawn. Needs 300-800 deg temperature range."
  },
  {
    name: "Phosphorus",
    imgSrc: "/life/phosphor.png",
    description: "Needs Oxygen and Phosphorus. Needs 0 - 30 deg temperature range."
  },

]

export const lifeDescriptions = {}
for (const life of lifeforms) {
  lifeDescriptions[life.name] = life.description;
}

export const lifeImages = {}
for (const life of lifeforms) {
  lifeImages[life.name] = life.imgSrc;
}
