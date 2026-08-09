CREATE TABLE IF NOT EXISTS soil_data (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    soil_type VARCHAR(100),
    ph DECIMAL(4,2),
    nitrogen DECIMAL(10,2),
    phosphorus DECIMAL(10,2),
    potassium DECIMAL(10,2),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
