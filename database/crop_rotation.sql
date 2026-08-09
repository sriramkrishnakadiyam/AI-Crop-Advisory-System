CREATE TABLE IF NOT EXISTS crop_rotation (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    previous_crop VARCHAR(100),
    current_crop VARCHAR(100),
    recommended_next_crop VARCHAR(100),
    benefit TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
