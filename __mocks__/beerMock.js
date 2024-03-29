export const mockedBeer = {
  id: 34,
  name: "Bourbon Baby",
  tagline: "Barrel-Aged Scotch Ale.",
  first_brewed: "01/2014",
  description:
    "Santa Paws Scotch ale aged in bourbon barrels - light, dry and toasty, with vanilla, hints of chocolate and ginger biscuit, and a faint spicy hoppiness.",
  image_url: "https://images.punkapi.com/v2/34.png",
  abv: 5.8,
  ibu: 35,
  target_fg: 1005,
  target_og: 1049,
  ebc: 44,
  srm: 22,
  ph: 4.4,
  attenuation_level: 90,
  volume: {
    value: 20,
    unit: "litres",
  },
  boil_volume: {
    value: 25,
    unit: "litres",
  },
  method: {
    mash_temp: [
      {
        temp: {
          value: 65,
          unit: "celsius",
        },
        duration: 90,
      },
    ],
    fermentation: {
      temp: {
        value: 19,
        unit: "celsius",
      },
    },
    twist: null,
  },
  ingredients: {
    malt: [
      {
        name: "Extra Pale",
        amount: {
          value: 1.75,
          unit: "kilograms",
        },
      },
      {
        name: "Munich",
        amount: {
          value: 0.44,
          unit: "kilograms",
        },
      },
      {
        name: "Dark Crystal",
        amount: {
          value: 0.5,
          unit: "kilograms",
        },
      },
      {
        name: "Wheat",
        amount: {
          value: 0.56,
          unit: "kilograms",
        },
      },
      {
        name: "Flaked Oats",
        amount: {
          value: 0.56,
          unit: "kilograms",
        },
      },
      {
        name: "Carafa Special Malt Type 3",
        amount: {
          value: 0.13,
          unit: "kilograms",
        },
      },
      {
        name: "Amber",
        amount: {
          value: 0.25,
          unit: "kilograms",
        },
      },
      {
        name: "Weyermann Beech Smoked",
        amount: {
          value: 0.06,
          unit: "kilograms",
        },
      },
    ],
    hops: [
      {
        name: "First Gold",
        amount: {
          value: 18.5,
          unit: "grams",
        },
        add: "start",
        attribute: "bitter",
      },
      {
        name: "Willamette",
        amount: {
          value: 12.5,
          unit: "grams",
        },
        add: "middle",
        attribute: "flavour",
      },
      {
        name: "Hallertauer Mittelfrüh",
        amount: {
          value: 6,
          unit: "grams",
        },
        add: "middle",
        attribute: "flavour",
      },
    ],
    yeast: "Wyeast 1056 - American Ale™",
  },
  food_pairing: [
    "Blackened cajun beef",
    "Pulled pork",
    "Millionaire's shortbread",
  ],
  brewers_tips:
    "Use bourbon-soaked oak chips in secondary to achieve barrel character.",
  contributed_by: "Ali Skinner <AliSkinner>",
};
