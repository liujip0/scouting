DROP TABLE IF EXISTS TeamMatchEntry;

CREATE TABLE IF NOT EXISTS TeamMatchEntry(
  eventKey text,
  matchKey text,
  teamNumber integer,
  alliance text CHECK(alliance IN ('Red', 'Blue')),
  robotNumber integer,
  entryVersion integer,

  autoNote1 boolean,
  autoNote2 boolean,
  autoNote3 boolean,
  autoNote4 boolean,
  autoNote5 boolean,
  autoNote6 boolean,
  autoNote7 boolean,
  autoNote8 boolean,
  autoLeftStartingZone boolean,
  autoSpeaker integer,
  autoAmp integer,

  teleopSpeaker integer,
  teleopAmp integer,
  teleopTrap integer,
  teleopPassed integer,
  teleopStolen integer,
  teleopChuteIntake boolean,
  teleopGroundIntake boolean,
  teleopEndgame text CHECK(teleopEndgame IN ('parked', 'climbed', 'none')),
  teleopSpotlight integer,

  postmatchDriverSkill integer,
  postmatchPlayedDefense boolean,
  postmatchUnderHeavyDefense boolean,
  PRIMARY KEY (eventKey, matchKey, alliance, robotNumber, entryVersion)
);


DROP TABLE IF EXISTS UserSessions;
DROP TABLE IF EXISTS UserApiTokens;
DROP TABLE IF EXISTS Users;

CREATE TABLE IF NOT EXISTS Users(
  username text UNIQUE PRIMARY KEY,
  hashedPassword text,
  saltToken text,
  permLevel text CHECK(permLevel IN ('team', 'datamanage', 'admin')) DEFAULT 'team'
);

CREATE TABLE IF NOT EXISTS UserSessions(
  sessionId integer PRIMARY KEY AUTOINCREMENT,
  username text,
  token text,
  expiresAt integer,
  FOREIGN KEY (username) REFERENCES Users(username)
);

CREATE TABLE IF NOT EXISTS UserApiTokens(
  tokenId integer PRIMARY KEY AUTOINCREMENT,
  username text,
  token text,
  FOREIGN KEY (username) REFERENCES Users(username)
);
