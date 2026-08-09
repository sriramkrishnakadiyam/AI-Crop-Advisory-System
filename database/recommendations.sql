CREATE TABLE IF NOT EXISTS recommendations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    previous_crop VARCHAR(100),
    current_crop VARCHAR(100),
    recommended_crop VARCHAR(100),
    confidence DECIMAL(5,2),
    reason TEXT,
    season VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
