class IrrigationEngine {
    static analyze(moisture, temp, rain, stage) {
        let priority = "Low";
        let status = "Not Required";
        let color = "var(--success)";
        let message = "Soil moisture is adequate and weather conditions do not warrant immediate irrigation.";

        // Basic logic rules
        if (rain > 20) {
            priority = "None";
            status = "Hold Irrigation";
            color = "var(--info)";
            message = "Significant rainfall expected. Conserve water and hold irrigation to prevent waterlogging.";
            return { priority, status, color, message };
        }

        if (moisture < 20) {
            priority = "High";
            status = "Immediate Irrigation Required";
            color = "var(--danger)";
            message = "Soil moisture is critically low. Immediate irrigation is necessary to prevent wilting and yield loss.";
        } else if (moisture >= 20 && moisture < 40) {
            if (temp > 30) {
                priority = "High";
                status = "Required (Heat Stress)";
                color = "var(--danger)";
                message = "Moderate moisture but high temperatures will cause rapid evaporation. Irrigate to prevent heat stress.";
            } else {
                priority = "Medium";
                status = "Plan Irrigation";
                color = "var(--warning)";
                message = "Moisture levels are dropping. Plan to irrigate within the next 2-3 days.";
            }
        }

        // Stage modifications (Flowering/Mid-season is most sensitive)
        if (stage === "Mid" && priority !== "None" && priority !== "Low") {
            message += " CRITICAL: Crop is in flowering/mid-season stage. Water stress now will significantly reduce yield.";
            priority = "High";
            color = "var(--danger)";
        }

        return { priority, status, color, message };
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const cropSelect = document.getElementById('irrCrop');
    if (cropSelect && typeof cropData !== 'undefined') {
        cropData.forEach(c => {
            cropSelect.innerHTML += `<option value="${c.name}">${c.name}</option>`;
        });
    }

    const form = document.getElementById('irrigationForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const moisture = parseFloat(document.getElementById('irrMoisture').value);
            const temp = parseFloat(document.getElementById('irrTemp').value);
            const rain = parseFloat(document.getElementById('irrRain').value);
            const stage = document.getElementById('irrStage').value;

            const res = IrrigationEngine.analyze(moisture, temp, rain, stage);

            const badge = document.getElementById('irrPriorityBadge');
            badge.textContent = `Priority: ${res.priority}`;
            badge.style.background = res.color;

            document.getElementById('irrStatus').textContent = res.status;
            document.getElementById('irrMessage').textContent = res.message;

            const results = document.getElementById('irrigationResults');
            results.style.display = 'block';
            results.classList.add('animate-fade-in');
        });
    }
});
