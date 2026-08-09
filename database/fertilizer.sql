CREATE TABLE IF NOT EXISTS fertilizer (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    crop_name VARCHAR(100),
    nitrogen_status VARCHAR(50),
    phosphorus_status VARCHAR(50),
    potassium_status VARCHAR(50),
    advisory TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
