-- Sample initial data for crops
INSERT INTO crops (crop_name, season, soil_type, min_ph, max_ph, nitrogen_min, phosphorus_min, potassium_min) VALUES
('Rice', 'Kharif', 'Clay', 5.5, 7.0, 80, 40, 40),
('Wheat', 'Rabi', 'Loamy', 6.0, 7.5, 100, 50, 40),
('Maize', 'Kharif', 'Loamy', 5.8, 7.2, 120, 60, 40),
('Cotton', 'Kharif', 'Black', 6.0, 8.0, 100, 50, 50),
('Sugarcane', 'Kharif', 'Loamy', 6.5, 7.5, 150, 60, 60);
