DROP TABLE IF EXISTS TeamMatchEntry;

CREATE TABLE IF NOT EXISTS TeamMatchEntry(
  eventKey text,
  matchKey text,
  teamNumber integer,
  alliance text CHECK(alliance IN ("Red", "Blue")),
  robotNumber integer,
  teleopSpeaker integer,
  PRIMARY KEY (eventKey, matchKey, teamNumber)
);


DROP TABLE IF EXISTS UserSessions;
DROP TABLE IF EXISTS Users;

CREATE TABLE IF NOT EXISTS Users(
  username text UNIQUE PRIMARY KEY,
  hashedPassword text,
  saltToken text,
  permLevel text CHECK(permLevel IN ("team", "datamanage", "admin")) DEFAULT "team"
);

CREATE TABLE IF NOT EXISTS UserSessions(
  sessionId integer PRIMARY KEY AUTOINCREMENT,
  username text,
  token text,
  expiresAt integer,
  FOREIGN KEY(username) REFERENCES Users(username)
);