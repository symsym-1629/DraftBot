-- Up

UPDATE players SET level = 50;
UPDATE players SET score = 10000;
CREATE TABLE IF NOT EXISTS fightlimiter (smallid INTEGER, bigid INTEGER,amount INTEGER, updatedAt DATETIME, createdAt DATETIME, PRIMARY KEY (smallid, bigid));

-- Down 
