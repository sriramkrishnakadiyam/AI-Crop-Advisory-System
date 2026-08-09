CREATE TABLE IF NOT EXISTS weather_data (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    temperature DECIMAL(6,2),
    humidity DECIMAL(6,2),
    rainfall DECIMAL(10,2),
    season VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
