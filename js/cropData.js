// Central dataset of 25+ crops for recommendation engine
const cropData = [
    {
        name: "Rice",
        season: "Kharif",
        soilTypes: ["Clay", "Clay Loam"],
        minTemp: 20, maxTemp: 35,
        minRain: 150, maxRain: 300,
        minPh: 5.5, maxPh: 7.0,
        nMin: 80, pMin: 40, kMin: 40
    },
    {
        name: "Wheat",
        season: "Rabi",
        soilTypes: ["Loamy", "Clay Loam"],
        minTemp: 10, maxTemp: 25,
        minRain: 50, maxRain: 100,
        minPh: 6.0, maxPh: 7.5,
        nMin: 100, pMin: 50, kMin: 40
    },
    {
        name: "Maize",
        season: "Kharif",
        soilTypes: ["Loamy", "Sandy Loam"],
        minTemp: 21, maxTemp: 27,
        minRain: 50, maxRain: 100,
        minPh: 5.8, maxPh: 7.2,
        nMin: 120, pMin: 60, kMin: 40
    },
    {
        name: "Cotton",
        season: "Kharif",
        soilTypes: ["Black", "Clay"],
        minTemp: 21, maxTemp: 30,
        minRain: 50, maxRain: 100,
        minPh: 6.0, maxPh: 8.0,
        nMin: 100, pMin: 50, kMin: 50
    },
    {
        name: "Sugarcane",
        season: "Kharif",
        soilTypes: ["Loamy", "Clay Loam"],
        minTemp: 20, maxTemp: 35,
        minRain: 100, maxRain: 150,
        minPh: 6.5, maxPh: 7.5,
        nMin: 150, pMin: 60, kMin: 60
    },
    {
        name: "Groundnut",
        season: "Kharif",
        soilTypes: ["Sandy Loam", "Loamy"],
        minTemp: 25, maxTemp: 30,
        minRain: 50, maxRain: 125,
        minPh: 6.0, maxPh: 6.5,
        nMin: 20, pMin: 40, kMin: 40
    },
    {
        name: "Soybean",
        season: "Kharif",
        soilTypes: ["Loamy", "Clay"],
        minTemp: 20, maxTemp: 30,
        minRain: 60, maxRain: 100,
        minPh: 6.0, maxPh: 7.5,
        nMin: 20, pMin: 60, kMin: 40
    },
    {
        name: "Mustard",
        season: "Rabi",
        soilTypes: ["Loamy", "Sandy Loam"],
        minTemp: 10, maxTemp: 25,
        minRain: 25, maxRain: 40,
        minPh: 6.0, maxPh: 7.5,
        nMin: 60, pMin: 40, kMin: 40
    },
    {
        name: "Chickpea",
        season: "Rabi",
        soilTypes: ["Clay", "Loamy"],
        minTemp: 20, maxTemp: 25,
        minRain: 60, maxRain: 90,
        minPh: 6.0, maxPh: 7.5,
        nMin: 20, pMin: 40, kMin: 20
    },
    {
        name: "Potato",
        season: "Rabi",
        soilTypes: ["Sandy Loam", "Loamy"],
        minTemp: 15, maxTemp: 25,
        minRain: 50, maxRain: 75,
        minPh: 5.5, maxPh: 6.5,
        nMin: 120, pMin: 60, kMin: 100
    },
    {
        name: "Tomato",
        season: "Zaid",
        soilTypes: ["Loamy", "Sandy Loam"],
        minTemp: 21, maxTemp: 28,
        minRain: 60, maxRain: 80,
        minPh: 6.0, maxPh: 7.0,
        nMin: 100, pMin: 50, kMin: 50
    },
    {
        name: "Onion",
        season: "Rabi",
        soilTypes: ["Sandy Loam", "Loamy"],
        minTemp: 13, maxTemp: 24,
        minRain: 50, maxRain: 75,
        minPh: 6.0, maxPh: 7.5,
        nMin: 100, pMin: 50, kMin: 50
    },
    {
        name: "Turmeric",
        season: "Kharif",
        soilTypes: ["Loamy", "Clay Loam"],
        minTemp: 20, maxTemp: 30,
        minRain: 150, maxRain: 250,
        minPh: 5.5, maxPh: 6.5,
        nMin: 120, pMin: 50, kMin: 100
    },
    {
        name: "Ginger",
        season: "Kharif",
        soilTypes: ["Loamy", "Sandy Loam"],
        minTemp: 20, maxTemp: 30,
        minRain: 150, maxRain: 300,
        minPh: 6.0, maxPh: 6.5,
        nMin: 100, pMin: 50, kMin: 50
    },
    {
        name: "Banana",
        season: "Kharif",
        soilTypes: ["Loamy", "Clay Loam"],
        minTemp: 15, maxTemp: 35,
        minRain: 150, maxRain: 250,
        minPh: 6.5, maxPh: 7.5,
        nMin: 200, pMin: 100, kMin: 300
    },
    {
        name: "Mango",
        season: "Zaid",
        soilTypes: ["Laterite", "Loamy"],
        minTemp: 24, maxTemp: 30,
        minRain: 75, maxRain: 250,
        minPh: 5.5, maxPh: 7.5,
        nMin: 100, pMin: 50, kMin: 100
    },
    {
        name: "Papaya",
        season: "Zaid",
        soilTypes: ["Loamy", "Sandy Loam"],
        minTemp: 22, maxTemp: 30,
        minRain: 100, maxRain: 200,
        minPh: 6.0, maxPh: 6.5,
        nMin: 200, pMin: 100, kMin: 200
    }
];
