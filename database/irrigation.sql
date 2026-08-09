CREATE TABLE IF NOT EXISTS irrigation (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    crop_name VARCHAR(100),
    soil_moisture DECIMAL(6,2),
    rainfall DECIMAL(10,2),
    irrigation_status VARCHAR(50),
    priority VARCHAR(50),
    advisory TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
