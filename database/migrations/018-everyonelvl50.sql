-- Up

UPDATE players SET level = 50;
UPDATE players SET score = 10000;
CREATE TABLE IF NOT EXISTS fightlimiter (id INTEGER PRIMARY KEY, smallid INTEGER, bigid INTEGER,amount INTEGER, updatedAt DATETIME, createdAt DATETIME);

-- Down 
