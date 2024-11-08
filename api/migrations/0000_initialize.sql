DROP TABLE IF EXISTS TeamMatchEntry;
DROP TABLE IF EXISTS Matches;
DROP TABLE IF EXISTS TeamEventAppearance;
DROP TABLE IF EXISTS Events;
DROP TABLE IF EXISTS Teams;

CREATE TABLE IF NOT EXISTS Teams(
  teamNumber integer UNIQUE PRIMARY KEY,
  teamName text
);

CREATE TABLE IF NOT EXISTS Events(
  eventKey text UNIQUE PRIMARY KEY,
  eventName text
);

CREATE TABLE IF NOT EXISTS TeamEventAppearance(
  eventKey text,
  teamNumber integer,
  PRIMARY KEY (eventKey, teamNumber),
  FOREIGN KEY(eventKey) REFERENCES Events(eventKey),
  FOREIGN KEY(teamNumber) REFERENCES Teams(teamNumber)
);

CREATE TABLE IF NOT EXISTS Matches(
  eventKey text,
  matchKey text UNIQUE PRIMARY KEY,
  reportedWinningAlliance text CHECK(reportedWinningAlliance IN ("Red", "Blue")),
  reportedRedScore integer,
  reportedBlueScore integer,
  FOREIGN KEY(eventKey) REFERENCES Events(eventKey)
);

CREATE TABLE IF NOT EXISTS TeamMatchEntry(
  matchKey text,
  teamNumber integer,
  alliance text CHECK(alliance IN ("Red", "Blue")),
  robotNumber integer,
  teleopSpeaker integer,

  PRIMARY KEY (matchKey, teamNumber),
  FOREIGN KEY(matchKey) REFERENCES Matches(matchKey),
  FOREIGN KEY(teamNumber) REFERENCES Teams(teamNumber)
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