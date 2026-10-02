# AI Crop Advisory System

A modern agriculture web application that provides crop recommendations and agricultural advisory information based on farmer-provided soil, weather, season, previous crop, current crop, and location information.

## Features
- **AI Crop Recommendation**: Rule-based scoring engine computing compatibility across soil, weather, season, and history to recommend Best Crop and alternatives.
- **Fertilizer Advisory** (Planned): Computes nitrogen, phosphorus, and potassium status and suggests fertilizer categories.
- **Crop Rotation** (Planned): Suggests next crops for optimal soil health.
- **Yield Prediction** (Planned): Estimates production based on crop, area, and environmental factors.

## Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Design**: Custom Glassmorphism UI, Responsive CSS, CSS Variables for Theming
- **Database (Schema)**: MySQL (`.sql` scripts provided for backend integration)

## Folder Structure
- `/css`: Stylesheets including core theme (`style.css`), forms, cards, and responsive rules.
- `/js`: Logic including the `cropRecommendation.js` AI engine, validation, and datasets.
- `/database`: MySQL schemas for tables like users, crops, weather, and advisories.
- `/assets`: Images and fonts.
- `/*.html`: Main application pages.

## Database Setup
The frontend currently uses mock data and JavaScript logic for the recommendation engine since a direct browser-to-MySQL connection is not secure or standard. However, the complete database structure is provided.
1. Create a database: `CREATE DATABASE ai_crop_advisory;`
2. Import the SQL files in the `database/` folder sequentially (start with `database.sql` and `users.sql`).

## Frontend Setup
1. Clone or download the repository.
2. Open `index.html` in a modern web browser.
3. Navigate to the **Crop Recommendation** module to test the AI advisory system.

## How the Recommendation Engine Works
The recommendation engine is a rule-based AI implemented in JavaScript (`js/cropRecommendation.js`). It calculates compatibility scores for multiple crops against user inputs:
- **Soil Compatibility**: Checks if the soil type matches crop requirements.
- **pH Compatibility**: Scores based on optimal pH ranges.
- **NPK & Weather**: Checks if nutrients (N, P, K), Temperature, Humidity, and Rainfall are within acceptable ranges for the selected crop.
- **Season**: heavily weights if the crop matches the selected Indian season (Kharif, Rabi, Zaid).

The crop with the highest aggregated score is the "Best Crop", with the next two serving as alternatives.

## Limitations
- This is a frontend-only demonstration without a live backend API connecting to MySQL.
- The rule-based engine is highly capable but relies on static threshold data rather than a trained ML model (like Random Forest or Neural Networks).

## Future Improvements
- Connect to a Node.js or Python backend.
- Integrate real-time weather APIs.
- Transition rule-based logic to a machine learning model.
