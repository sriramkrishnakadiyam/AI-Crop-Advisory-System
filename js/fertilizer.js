class FertilizerEngine {
    static analyze(cropName, n, p, k, ph) {
        // Find crop requirements from cropData
        const crop = cropData.find(c => c.name === cropName);
        if (!crop) return null;

        // Calculate Status
        const getStatus = (val, minReq) => {
            if (val < minReq * 0.7) return { status: 'Low', color: 'var(--danger)' };
            if (val > minReq * 1.3) return { status: 'High', color: 'var(--warning)' };
            return { status: 'Optimal', color: 'var(--success)' };
        };

        const nStat = getStatus(n, crop.nMin);
        const pStat = getStatus(p, crop.pMin);
        const kStat = getStatus(k, crop.kMin);

        // Determine Category
        let category = "Balanced NPK";
        let message = `Your soil nutrients are relatively balanced for ${cropName}. Maintain current practices.`;

        if (nStat.status === 'Low' && pStat.status === 'Low' && kStat.status === 'Low') {
            category = "Complex NPK Required";
            message = `Your soil is deficient in all major nutrients for ${cropName}. A complete NPK fertilizer application is highly recommended before sowing.`;
        } else if (nStat.status === 'Low') {
            category = "Nitrogen Rich Required";
            message = `Your soil lacks Nitrogen for optimal ${cropName} growth. Apply Urea or Nitrogen-heavy fertilizers.`;
        } else if (pStat.status === 'Low') {
            category = "Phosphorus Rich Required";
            message = `Low Phosphorus detected. Apply DAP or SSP to support root development for ${cropName}.`;
        } else if (kStat.status === 'Low') {
            category = "Potassium Rich Required";
            message = `Low Potassium. Apply MOP (Muriate of Potash) to improve disease resistance and quality.`;
        } else if (ph < 5.5) {
            category = "Soil Amendment";
            message = "Your soil is highly acidic. Applying agricultural lime is recommended to improve nutrient uptake.";
        }

        return {
            n: nStat,
            p: pStat,
            k: kStat,
            category: category,
            message: message
        };
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Populate the suggestions while still allowing the farmer to type a crop name.
    const cropOptions = document.getElementById('cropOptions');
    if (cropOptions && typeof cropData !== 'undefined') {
        cropData.forEach(c => {
            const option = document.createElement('option');
            option.value = c.name;
            cropOptions.appendChild(option);
        });
    }

    const form = document.getElementById('fertilizerForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const cropInput = document.getElementById('crop').value.trim();
            const matchingCrop = cropData.find(c => c.name.toLowerCase() === cropInput.toLowerCase());
            const crop = matchingCrop ? matchingCrop.name : cropInput;
            const ph = document.getElementById('ph') ? parseFloat(document.getElementById('ph').value) : 6.5;
            const n = document.getElementById('n') ? parseFloat(document.getElementById('n').value) : 50;
            const p = document.getElementById('p') ? parseFloat(document.getElementById('p').value) : 30;
            const k = document.getElementById('k') ? parseFloat(document.getElementById('k').value) : 20;

            const result = FertilizerEngine.analyze(crop, n, p, k, ph);
            
            if (result) {
                const resultsDiv = document.getElementById('fertilizerResults');
                
                const setStatus = (id, data) => {
                    const el = document.getElementById(id);
                    el.textContent = data.status;
                    el.style.color = data.color;
                };

                setStatus('nStatus', result.n);
                setStatus('pStatus', result.p);
                setStatus('kStatus', result.k);
                
                document.getElementById('fertCategory').textContent = result.category;
                document.getElementById('advisoryMessage').textContent = result.message;
                
                resultsDiv.style.display = 'block';
                resultsDiv.classList.add('animate-fade-in');
            } else {
                alert('Please enter a crop from the suggested crop names.');
            }
        });
    }
});
