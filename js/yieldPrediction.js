class YieldEngine {
    // Base potential yields in tonnes/hectare
    static baseYields = {
        "Rice": 4.5, "Wheat": 3.8, "Maize": 4.0, "Cotton": 2.5, "Sugarcane": 70.0,
        "Groundnut": 1.8, "Soybean": 2.2, "Mustard": 1.5, "Chickpea": 1.2, "Potato": 22.0
    };

    static estimate(cropName, area, temp, rain, n) {
        const crop = cropData.find(c => c.name === cropName);
        if (!crop) return null;

        let baseYield = this.baseYields[cropName] || 2.0;
        let modifier = 1.0;

        // Temperature penalty
        if (temp < crop.minTemp || temp > crop.maxTemp) {
            modifier *= 0.8; // 20% penalty for sub-optimal temp
        }

        // Rainfall penalty
        if (rain < crop.minRain) {
            modifier *= 0.6; // Heavy penalty for drought
        } else if (rain > crop.maxRain * 1.5) {
            modifier *= 0.8; // Penalty for flooding
        }

        // Nitrogen boost/penalty
        if (n < crop.nMin) {
            modifier *= 0.7;
        } else if (n > crop.nMin) {
            modifier *= 1.1; // Slight boost for good N
        }

        let expectedYieldPerHa = baseYield * modifier;
        let totalProduction = expectedYieldPerHa * area;

        let category = "Average";
        let color = "var(--warning)";
        if (modifier >= 1.0) {
            category = "High"; color = "var(--success)";
        } else if (modifier < 0.75) {
            category = "Low"; color = "var(--danger)";
        }

        return {
            yieldPerHa: expectedYieldPerHa.toFixed(2),
            totalProduction: totalProduction.toFixed(2),
            category: category,
            color: color
        };
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const cropSelect = document.getElementById('yieldCrop');
    if (cropSelect && typeof cropData !== 'undefined') {
        cropData.forEach(c => {
            cropSelect.innerHTML += `<option value="${c.name}">${c.name}</option>`;
        });
    }

    const form = document.getElementById('yieldForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const crop = document.getElementById('yieldCrop').value;
            const area = parseFloat(document.getElementById('yieldArea').value);
            const temp = parseFloat(document.getElementById('yieldTemp').value);
            const rain = parseFloat(document.getElementById('yieldRain').value);
            const n = parseFloat(document.getElementById('yieldN').value);

            const res = YieldEngine.estimate(crop, area, temp, rain, n);

            if (res) {
                document.getElementById('resYield').textContent = res.yieldPerHa;
                document.getElementById('resTotal').textContent = res.totalProduction;
                
                const catEl = document.getElementById('resCategory');
                catEl.textContent = res.category;
                catEl.style.color = res.color;

                const results = document.getElementById('yieldResults');
                results.style.display = 'block';
                results.classList.add('animate-fade-in');
            }
        });
    }
});
