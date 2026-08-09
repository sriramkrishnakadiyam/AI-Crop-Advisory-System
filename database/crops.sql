CREATE TABLE IF NOT EXISTS crops (
    id INT PRIMARY KEY AUTO_INCREMENT,
    crop_name VARCHAR(100) NOT NULL,
    season VARCHAR(50),
    soil_type VARCHAR(100),
    min_ph DECIMAL(4,2),
    max_ph DECIMAL(4,2),
    nitrogen_min DECIMAL(10,2),
    phosphorus_min DECIMAL(10,2),
    potassium_min DECIMAL(10,2)
);
