CREATE TABLE IF NOT EXISTS Users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  admin BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS Pets (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    gender VARCHAR(1) NOT NULL,
    price INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Bucket (
    user_id INT,
    pet_id INT,
    PRIMARY KEY (user_id, pet_id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES Users (id),
    CONSTRAINT fk_pet FOREIGN KEY (pet_id) REFERENCES Pet (id)
);