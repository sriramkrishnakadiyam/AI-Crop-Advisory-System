CREATE TABLE IF NOT EXISTS yield_prediction (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    crop_name VARCHAR(100),
    area DECIMAL(10,2),
    predicted_yield DECIMAL(10,2),
    estimated_production DECIMAL(10,2),
    yield_category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
