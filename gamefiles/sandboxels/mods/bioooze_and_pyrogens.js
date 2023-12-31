elements.bioooze = {
	color: ["#53FF4F", "#53FF4F", "#06DE00", "#04A600", "#036E00"],
	behavior: behaviors.LIQUID,
	tempHigh: 100,
	stateHigh: ["plague", "slime", "steam", "poison"],
  
	category: "liquids",
	heatCapacity: 3.52,
	name: "bio-ooze",
	reactions: {
	  "water": {
		"elem1": "slime",
		"elem2": "slime"
	  },
	  "poison": {
		"elem1": "slime",
		"elem2": "slime"
	  },
  
	  "blood": {
		"elem1": ["bioooze", "bioooze", "poison", "slime", null],
		"elem2": "infection"
	  },
	  "soap": {
		"elem1": "slime",
		"chance": 0.02
	  },
	  "plant": {
		"elem1": ["bioooze", "bioooze", "poison", "slime", null],
		"elem2": "dead_plant"
	  },
	  "grass": {
		"elem1": ["bioooze", "bioooze", "poison", "slime", null],
		"elem2": "dead_plant"
	  },
	  "algae": {
		"elem1": ["bioooze", "bioooze", "poison", "slime", null],
		"elem2": "dead_plant"
	  },
	  "mushroom_spore": {
		"elem1": ["bioooze", "bioooze", "poison", "slime", null],
		"elem2": "dead_plant"
	  },
	  "lichen": {
		"elem1": ["bioooze", "bioooze", "poison", "slime", null],
		"elem2": "dead_plant"
	  },
	  "rat": {
		"elem1": ["bioooze", "bioooze", "poison", "slime", null],
		"elem2": "rotten_meat"
	  },
	  "frog": {
		"elem1": ["bioooze", "bioooze", "poison", "slime", null],
		"elem2": "rotten_meat"
	  },
	  "fish": {
		"elem1": ["bioooze", "bioooze", "poison", "slime", null],
		"elem2": "rotten_meat"
	  },
	  "bird": {
		"elem1": ["bioooze", "bioooze", "poison", "slime", null],
		"elem2": "rotten_meat"
	  },
	  "head": {
		"elem1": ["bioooze", "bioooze", "poison", "slime", null],
		"elem2": "rotten_meat"
	  },
	  "body": {
		"elem1": ["bioooze", "bioooze", "poison", "slime", null],
		"elem2": "rotten_meat"
	  },
	  "ant": {
		"elem1": ["bioooze", "bioooze", "bioooze", "bioooze", "poison", "slime", null],
		"elem2": "dust"
	  },
	  "worm": {
		"elem1": ["bioooze", "bioooze", "bioooze", "bioooze", "poison", "slime", null],
		"elem2": "dust"
	  },
	  "fly": {
		"elem1": ["bioooze", "bioooze", "bioooze", "bioooze", "poison", "slime", null],
		"elem2": "dust"
	  },
	  "firefly": {
		"elem1": ["bioooze", "bioooze", "bioooze", "bioooze", "poison", "slime", null],
		"elem2": "dust"
	  },
	  "bee": {
		"elem1": ["bioooze", "bioooze", "bioooze", "bioooze", "poison", "slime", null],
		"elem2": "dust"
	  },
	  "slug": {
		"elem1": ["bioooze", "bioooze", "bioooze", "bioooze", "poison", "slime", null],
		"elem2": "dust"
	  },
	  "snail": {
		"elem1": ["bioooze", "bioooze", "bioooze", "bioooze", "poison", "slime", null],
		"elem2": "calcium"
	  },
	  "sapling": {
		"elem1": ["bioooze", "bioooze", "poison", "slime", null],
		"elem2": "dead_plant"
	  },
	  "root": {
		"elem1": ["bioooze", "bioooze", "poison", "slime", null],
		"elem2": "dead_plant"
	  },
	  "flower_seed": {
		"elem1": ["bioooze", "bioooze", "poison", "slime", null],
		"elem2": "dead_plant"
	  },
	  "pistil": {
		"elem1": ["bioooze", "bioooze", "poison", "slime", null],
		"elem2": "dead_plant"
	  },
	  "petal": {
		"elem1": ["bioooze", "bioooze", "poison", "slime", null],
		"elem2": "dead_plant"
	  },
	  "grass_seed": {
		"elem1": ["bioooze", "bioooze", "poison", "slime", null],
		"elem2": "dead_plant"
	  },
	  "meat": {
		"elem1": ["bioooze", "bioooze", "poison", "slime", null],
		"elem2": "rotten_meat"
	  },
	  "wood": {
		"elem1": ["bioooze", "bioooze", "poison", "slime", null],
		"elem2": "sawdust",
		"chance": 0.25
	  }
	},
  
	state: "liquid",
	density: 1.03,
	conduct: 0.0008,
	stain: 0.2,
	viscosity: 60,
	description: "A particularly potent toxic sludge loaded with parasites and ickiness.",
  };
  
  function threshholdedPyrogen(pixel, threshholdTemp, baseHeat, divisor) {
	if (pixel.temp < threshholdTemp) {
	  pixel.temp += Math.max(baseHeat, (threshholdTemp - pixel.temp) / divisor);
	} else {
	  pixel.temp += baseHeat;
	};
  };
  
  function tpHeatCalc(startTemp, threshholdTemp, baseHeat, divisor) {
	if (startTemp < threshholdTemp) {
	  return Math.max(baseHeat, (threshholdTemp - startTemp) / divisor);
	} else {
	  return baseHeat;
	};
  };
  
  function itfChanceCalc(baseHeat, divisor, chanceLimit) {
	return Math.min(chanceLimit, (baseHeat / divisor))
  };
  
  function inferniumTempFire(pixel, divisor, chanceLimit) {
	if (Math.random() < Math.min(chanceLimit, (pixel.temp / divisor))) {
	  var randomCoord = adjacentCoords[Math.floor(Math.random() * adjacentCoords.length)];
	  var nx = pixel.x + randomCoord[0];
	  var ny = pixel.y + randomCoord[1];
	  if (isEmpty(nx, ny)) {
		createPixel("fire", nx, ny);
		pixelMap[nx][ny].temp = pixel.temp;
	  };
	};
  };
  
  elements.pyreite = {
	color: ["#cc674b", "#e06e41", "#f77320", "#f77320", "#fa9b28", "#fac228"],
	behavior: behaviors.WALL,
	tempHigh: 5500,
	category: "solids",
	density: 14600,
	conduct: 0.66,
	hardness: 0.79,
	tick: function(pixel) {
	  threshholdedPyrogen(pixel, 1722, 0.25, 512);
	},
  };
  
  elements.infernium = {
	color: ["#bf4b39", "#e68453", "#f7994d", "#f7994d", "#ffa154", "#ffe875"],
	behavior: [
	  "XX|CR:fire%0.01|XX",
	  "XX|XX|XX",
	  "XX|XX|XX"
	],
	tempHigh: 5526,
	category: "solids",
	density: 13815,
	conduct: 0.691,
	hardness: 0.79,
	tick: function(pixel) {
	  threshholdedPyrogen(pixel, 1763, 0.32, 512);
	  inferniumTempFire(pixel, 40000, 0.2);
	},
  };
  
  elements.molten_pyreite = {
	tick: function(pixel) {
	  pixel.temp += 0.25;
	},
	reactions: {
	  molten_infernium: {
		elem1: "molten_infernyrite",
		elem2: "molten_infernyrite",
		temp1: 304,
		temp2: 304
	  },
	},
  };
  
  elements.molten_infernium = {
	tick: function(pixel) {
	  pixel.temp += 0.32;
	  inferniumTempFire(pixel, 40000, 0.2);
	},
  };
  
  elements.infernyrite = {
	color: ["#d45f2c", "#f59449", "#f7994d", "#fcaa4c", "#fab973", "#ffea8c"],
	behavior: [
	  "XX|CR:fire%0.01|XX",
	  "XX|XX|XX",
	  "XX|XX|XX"
	],
	tempHigh: 9901,
	category: "solids",
	density: 14197,
	conduct: 0.63,
	hardness: 0.8,
	tick: function(pixel) {
	  threshholdedPyrogen(pixel, 2501, 0.79, 480);
	  inferniumTempFire(pixel, 40000, 0.2);
	},
  };
  
  elements.molten_infernyrite = {
	tick: function(pixel) {
	  pixel.temp += 0.79;
	  inferniumTempFire(pixel, 40000, 0.2);
	},
	reactions: {
	  blazing_pyrotheum: {
		elem1: "molten_infernyreitheum",
		elem2: ["blazing_pyrotheum", "molten_infernyreitheum"],
		temp1: 1043,
		temp2: 1043
	  },
	},
  };
  
  if (elements.blazing_pyrotheum) {
	elements.infernyreitheum = {
	  color: ["#f2a863", "#faaf4d", "#ffb547", "#fcaa4c", "#fcd64c", "#fff6ba"],
	  behavior: [
		"XX|CR:fire%0.08|XX",
		"XX|XX|XX",
		"XX|XX|XX"
	  ],
	  tempHigh: 11052,
	  category: "solids",
	  density: 15064,
	  conduct: 0.52,
	  hardness: 0.8,
	  tick: function(pixel) {
		threshholdedPyrogen(pixel, 8932, 2.03, 416);
		inferniumTempFire(pixel, 25000, 0.4);
	  },
	};
  
	function pyrestoneInfernyreitheumReaction(pyrestoneName) {
	  return {
		elem1: "molten_pyrinfernyreitheum",
		elem2: [pyrestoneName, pyrestoneName, "molten_pyrinfernyreitheum"],
		temp1: 3085,
		temp2: 3085
	  };
	};
  
	elements.molten_infernyreitheum = {
	  tick: function(pixel) {
		pixel.temp += 2.03;
		inferniumTempFire(pixel, 25000, 0.4);
	  },
	  reactions: {
		unignited_pyrestone: pyrestoneInfernyreitheumReaction("unignited_pyrestone"),
		ignited_pyrestone: pyrestoneInfernyreitheumReaction("ignited_pyrestone"),
		heated_pyrestone: pyrestoneInfernyreitheumReaction("heated_pyrestone"),
		burning_pyrestone: pyrestoneInfernyreitheumReaction("burning_pyrestone"),
		blazing_pyrestone: pyrestoneInfernyreitheumReaction("blazing_pyrestone"),
		fiery_pyrestone: pyrestoneInfernyreitheumReaction("fiery_pyrestone")
	  }
	};
  
	if (elements.unignited_pyrestone) {
	  elements.pyrinfernyreitheum = {
		color: ["#e6c087", "#f7c76d", "#ffd79c", "#ffd79c", "#ffe387", "#ffffd9"],
		behavior: [
		  "XX|CR:fire%2|XX",
		  "XX|XX|XX",
		  "XX|XX|XX"
		],
		tempHigh: 18254,
		category: "solids",
		density: 17042,
		conduct: 0.25,
		hardness: 0.8,
		tick: function(pixel) {
		  threshholdedPyrogen(pixel, 15944, 7.01, 352);
		  inferniumTempFire(pixel, 15000, 0.8);
		},
	  };
  
	  elements.molten_pyrinfernyreitheum = {
		tick: function(pixel) {
		  pixel.temp += 7.01;
		  inferniumTempFire(pixel, 15000, 0.8);
		},
	  };
  
	};
  };