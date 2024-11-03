DROP TABLE IF EXISTS Teams;
CREATE TABLE IF NOT EXISTS Teams(
  teamNumber integer UNIQUE PRIMARY KEY,
  teamName text
);

DROP TABLE IF EXISTS Events;
CREATE TABLE IF NOT EXISTS Events(
  eventKey text UNIQUE PRIMARY KEY,
  eventName text
);

DROP TABLE IF EXISTS TeamEventAppearance;
CREATE TABLE IF NOT EXISTS TeamEventAppearance(
  eventKey text,
  teamNumber integer,
  PRIMARY KEY (eventKey, teamNumber),
  FOREIGN KEY(eventKey) REFERENCES Events(eventKey),
  FOREIGN KEY(teamNumber) REFERENCES Teams(teamNumber)
);

DROP TABLE IF EXISTS Matches;
CREATE TABLE IF NOT EXISTS Matches(
  eventKey text,
  matchKey text UNIQUE PRIMARY KEY,
  reportedWinningAlliance text CHECK(reportedWinningAlliance IN ("Red", "Blue")),
  reportedRedScore integer,
  reportedBlueScore integer,
  FOREIGN KEY(eventKey) REFERENCES Events(eventKey)
);

DROP TABLE IF EXISTS TeamMatchEntry;
CREATE TABLE IF NOT EXISTS TeamMatchEntry(
  matchKey text,
  teamNumber integer,
  alliance text CHECK(alliance IN ("Red", "Blue")),
  teleopSpeaker integer,

  PRIMARY KEY (matchKey, teamNumber),
  FOREIGN KEY(matchKey) REFERENCES Matches(matchKey),
  FOREIGN KEY(teamNumber) REFERENCES Teams(teamNumber)
);

DROP TABLE IF EXISTS ApiLogs;
CREATE TABLE IF NOT EXISTS ApiLogs(
  callId integer PRIMARY KEY AUTOINCREMENT,
  callTime integer,
  callDuration integer,
  callPath text,
  callType text CHECK(callType IN ("query", "mutation", "subscription")),
  callInput text,
  callSuccess boolean
);

DROP TABLE IF EXISTS Users;
CREATE TABLE IF NOT EXISTS Users(
  username text UNIQUE PRIMARY KEY,
  hashedPassword text,
  permLevel text CHECK(permLevel IN ("team", "admin"))
);

DROP TABLE IF EXISTS UserSessions;
CREATE TABLE IF NOT EXISTS UserSessions(
  sessionId integer PRIMARY KEY AUTOINCREMENT,
  username text,
  token text,
  expiresAt integer,
  FOREIGN KEY(username) REFERENCES Users(username)
);