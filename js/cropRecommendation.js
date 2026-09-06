class CropRecommendationEngine {
    constructor(cropData) {
        this.crops = cropData;
    }

    /**
     * Recommends crops based on input parameters.
     * Inputs: { temp, humidity, rainfall, ph, n, p, k, soilType, season }
     */
    recommend(inputs) {
        let scoredCrops = this.crops.map(crop => {
            let score = 0;
            let maxScore = 100;
            let reasons = [];

            // 1. Season Compatibility (High Weight: 30)
            if (crop.season.toLowerCase() === inputs.season.toLowerCase()) {
                score += 30;
                reasons.push("Perfect season match");
            } else {
                reasons.push("Different season preference");
            }

            // 2. Soil Type Compatibility (Weight: 20)
            let soilMatch = crop.soilTypes.some(s => s.toLowerCase() === inputs.soilType.toLowerCase());
            if (soilMatch) {
                score += 20;
                reasons.push("Excellent soil compatibility");
            } else {
                reasons.push("Sub-optimal soil type");
            }

            // 3. pH Compatibility (Weight: 10)
            if (inputs.ph >= crop.minPh && inputs.ph <= crop.maxPh) {
                score += 10;
                reasons.push("Optimal pH range");
            } else {
                maxScore -= 10; // Penalize max potential
            }

            // 4. Weather (Temp, Humidity, Rainfall) (Weight: 20)
            let weatherScore = 0;
            if (inputs.temp >= crop.minTemp && inputs.temp <= crop.maxTemp) weatherScore += 7;
            if (inputs.rainfall >= crop.minRain && inputs.rainfall <= crop.maxRain) weatherScore += 7;
            // Simplified humidity check (assuming moderate 40-80% is okay for most, but adjust as needed)
            if (inputs.humidity >= 40 && inputs.humidity <= 85) weatherScore += 6;
            
            score += weatherScore;
            if (weatherScore >= 15) reasons.push("Favorable weather conditions");

            // 5. NPK Compatibility (Weight: 20)
            // Simplified logic: If soil has at least 80% of minimum required nutrient, it's good.
            let nRatio = inputs.n / crop.nMin;
            let pRatio = inputs.p / crop.pMin;
            let kRatio = inputs.k / crop.kMin;
            
            let npkScore = 0;
            if (nRatio >= 0.8) npkScore += 7;
            if (pRatio >= 0.8) npkScore += 7;
            if (kRatio >= 0.8) npkScore += 6;

            score += npkScore;
            if (npkScore >= 15) reasons.push("Good nutrient availability");

            // Calculate confidence percentage
            let confidence = Math.round((score / 100) * 100);

            return {
                crop: crop,
                score: confidence,
                primaryReason: reasons[0] || "Viable alternative",
                allReasons: reasons
            };
        });

        // Sort descending by score
        scoredCrops.sort((a, b) => b.score - a.score);

        return {
            best: scoredCrops[0],
            alternatives: [scoredCrops[1], scoredCrops[2]]
        };
    }
}

// UI Integration
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cropRecommendationForm');
    const resultContainer = document.getElementById('recommendationResults');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Gather inputs (using mock data for scientific fields if they don't exist in the mockup UI)
            const inputs = {
                season: document.getElementById('season') ? document.getElementById('season').value : 'Kharif',
                soilType: document.getElementById('soilType') ? document.getElementById('soilType').value : 'Loamy',
                temp: document.getElementById('temp') ? parseFloat(document.getElementById('temp').value) : 25,
                humidity: document.getElementById('humidity') ? parseFloat(document.getElementById('humidity').value) : 70,
                rainfall: document.getElementById('rainfall') ? parseFloat(document.getElementById('rainfall').value) : 100,
                ph: document.getElementById('ph') ? parseFloat(document.getElementById('ph').value) : 6.5,
                n: document.getElementById('n') ? parseFloat(document.getElementById('n').value) : 90,
                p: document.getElementById('p') ? parseFloat(document.getElementById('p').value) : 42,
                k: document.getElementById('k') ? parseFloat(document.getElementById('k').value) : 43,
            };

            // Validate
            const errors = Validator.validateCropInputs(inputs);
            if (errors.length > 0) {
                Validator.showError(errors.join('\n'));
                return;
            }

            // Run Engine
            const engine = new CropRecommendationEngine(cropData);
            const results = engine.recommend(inputs);

            // Render Results
            renderResults(results);
        });
    }

    function renderResults(results) {
        resultContainer.innerHTML = '';
        resultContainer.classList.add('animate-fade-in');

        // Best Crop
        const bestHtml = createCardHtml(results.best, true);
        
        // Alternatives
        let altHtml = '';
        results.alternatives.forEach(alt => {
            altHtml += createCardHtml(alt, false);
        });

        resultContainer.innerHTML = bestHtml + altHtml;
        resultContainer.style.display = 'grid';
        
        // Scroll to results
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function createCardHtml(data, isBest) {
        const badge = isBest ? '<div class="rec-badge">Best Match</div>' : '<div class="rec-badge alt">Alternative</div>';
        const cardClass = isBest ? 'rec-card best-match' : 'rec-card';
        const color = isBest ? 'var(--primary-color)' : 'var(--secondary-color)';

        return `
            <div class="${cardClass}">
                ${badge}
                <div class="rec-image">🌱</div>
                <div class="rec-content">
                    <h3 class="rec-title">${data.crop.name}</h3>
                    <div class="rec-score">
                        <span style="font-weight: bold; color: ${color}">${data.score}% Match</span>
                        <div class="score-bar">
                            <div class="score-fill" style="width: ${data.score}%; background: ${color}"></div>
                        </div>
                    </div>
                    <p class="rec-reason"><strong>Reason:</strong> ${data.primaryReason}</p>
                    <p class="rec-reason" style="margin-top: 5px; font-size: 0.8rem;">
                        Optimal pH: ${data.crop.minPh}-${data.crop.maxPh} | Req Rainfall: ${data.crop.minRain}mm+
                    </p>
                </div>
            </div>
        `;
    }
});
