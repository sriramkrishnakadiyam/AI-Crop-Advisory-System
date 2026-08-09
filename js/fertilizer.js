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
    // Populate crops in select if possible
    const cropSelect = document.getElementById('crop');
    if (cropSelect && typeof cropData !== 'undefined') {
        cropSelect.innerHTML = '<option value="">Select Crop...</option>';
        cropData.forEach(c => {
            cropSelect.innerHTML += `<option value="${c.name}">${c.name}</option>`;
        });
    }

    const form = document.getElementById('fertilizerForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const crop = document.getElementById('crop').value;
            const ph = parseFloat(document.getElementById('ph').value);
            const n = parseFloat(document.getElementById('n').value);
            const p = parseFloat(document.getElementById('p').value);
            const k = parseFloat(document.getElementById('k').value);

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
            }
        });
    }
});
