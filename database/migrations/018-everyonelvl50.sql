-- Up

UPDATE players SET level = 50;
UPDATE players SET score = 10000;
CREATE TABLE IF NOT EXISTS fightlimiter (id INTEGER PRIMARY KEY, smallid VARCHAR(64), bigid VARCHAR(64),amount INTEGER, updatedAt DATETIME, createdAt DATETIME);

-- Down 
