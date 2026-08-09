class CropRotationEngine {
    // Categorize crops for logic
    static legumes = ["Chickpea", "Soybean", "Groundnut", "Pigeon Pea", "Black Gram", "Green Gram", "Lentil"];
    static cereals = ["Rice", "Wheat", "Maize", "Bajra", "Jowar", "Barley"];
    static heavyFeeders = ["Sugarcane", "Cotton", "Maize", "Potato", "Tomato", "Banana", "Papaya"];

    static recommend(prevCrop, currCrop) {
        let isCurrLegume = this.legumes.includes(currCrop);
        let isCurrHeavyFeeder = this.heavyFeeders.includes(currCrop);
        let isCurrCereal = this.cereals.includes(currCrop);

        let nextType = "";
        let benefit = "";
        let soil = "";
        let suggestedCrops = [];

        if (isCurrHeavyFeeder) {
            nextType = "Legume";
            benefit = "Breaks pest/disease cycles and replenishes soil nitrogen.";
            soil = "Heavy feeders deplete nutrients quickly. Legumes will fix atmospheric nitrogen back into the soil.";
            suggestedCrops = ["Chickpea", "Soybean", "Groundnut"];
        } else if (isCurrLegume) {
            nextType = "Cereal/Heavy Feeder";
            benefit = "Utilizes the nitrogen fixed by the previous legume crop.";
            soil = "Excellent nitrogen availability. Good time to plant a demanding crop.";
            suggestedCrops = ["Wheat", "Maize", "Cotton"];
        } else if (isCurrCereal) {
            nextType = "Legume or Root Crop";
            benefit = "Improves soil structure and breaks disease cycles associated with continuous cereal farming.";
            soil = "Prevents buildup of cereal-specific pathogens.";
            suggestedCrops = ["Soybean", "Potato", "Onion"];
        } else {
            nextType = "Legume";
            benefit = "General soil health improvement.";
            soil = "Adds organic matter and nitrogen.";
            suggestedCrops = ["Chickpea", "Groundnut"];
        }

        return {
            recommended: suggestedCrops.join(" OR "),
            benefit: benefit,
            soil: soil
        };
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const popSelects = [document.getElementById('prevCrop'), document.getElementById('currCrop')];
    if (typeof cropData !== 'undefined') {
        popSelects.forEach(sel => {
            if (sel) {
                cropData.forEach(c => {
                    sel.innerHTML += `<option value="${c.name}">${c.name}</option>`;
                });
            }
        });
    }

    const form = document.getElementById('rotationForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const prev = document.getElementById('prevCrop').value;
            const curr = document.getElementById('currCrop').value;

            if (prev === curr) {
                alert("Continuous monoculture is generally not recommended! Try selecting a different previous crop to see rotation benefits.");
            }

            const res = CropRotationEngine.recommend(prev, curr);

            document.getElementById('recNextCrop').textContent = res.recommended;
            document.getElementById('rotBenefit').textContent = res.benefit;
            document.getElementById('rotSoil').textContent = res.soil;

            const results = document.getElementById('rotationResults');
            results.style.display = 'block';
            results.classList.add('animate-fade-in');
        });
    }
});
