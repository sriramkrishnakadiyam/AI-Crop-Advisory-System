// Common validation logic for forms
class Validator {
    static isRequired(value) {
        return value !== null && value.trim() !== '';
    }

    static isNumber(value) {
        return !isNaN(value) && value.trim() !== '';
    }

    static isInRange(value, min, max) {
        const num = parseFloat(value);
        return num >= min && num <= max;
    }

    static validateCropInputs(inputs) {
        let errors = [];

        if (!this.isRequired(inputs.season)) errors.push("Season is required.");
        if (!this.isRequired(inputs.soilType)) errors.push("Soil type is required.");
        
        if (!this.isNumber(inputs.temp) || !this.isInRange(inputs.temp, -10, 60)) {
            errors.push("Temperature must be a valid number between -10 and 60 °C.");
        }
        
        if (!this.isNumber(inputs.humidity) || !this.isInRange(inputs.humidity, 0, 100)) {
            errors.push("Humidity must be a percentage (0-100).");
        }
        
        if (!this.isNumber(inputs.rainfall) || !this.isInRange(inputs.rainfall, 0, 1000)) {
            errors.push("Rainfall must be a valid amount in mm.");
        }
        
        if (!this.isNumber(inputs.ph) || !this.isInRange(inputs.ph, 0, 14)) {
            errors.push("Soil pH must be between 0 and 14.");
        }
        
        if (!this.isNumber(inputs.n) || !this.isNumber(inputs.p) || !this.isNumber(inputs.k)) {
            errors.push("Nitrogen, Phosphorus, and Potassium values must be numbers.");
        }

        return errors;
    }

    static showError(message) {
        alert("Validation Error: \n" + message);
    }
}
