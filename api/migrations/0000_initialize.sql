DROP TABLE IF EXISTS TeamMatchEntry;

CREATE TABLE IF NOT EXISTS TeamMatchEntry(
  eventKey text,
  matchKey text,
  teamNumber integer,
  alliance text CHECK(alliance IN ('Red', 'Blue')),
  robotNumber integer,
  deviceTeamNumber integer,
  deviceId text,
  scoutTeamNumber integer,
  scoutName text,

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
DROP TABLE IF EXISTS Users;

CREATE TABLE IF NOT EXISTS Users(
  username text UNIQUE PRIMARY KEY,
  permLevel text CHECK(permLevel IN ('none', 'demo', 'team', 'datamanage', 'admin')) DEFAULT 'team',
  hashedPassword text,
  saltToken text,
  publicApiToken text
);

CREATE TABLE IF NOT EXISTS UserSessions(
  sessionId integer PRIMARY KEY AUTOINCREMENT,
  username text,
  token text,
  expiresAt integer,
  FOREIGN KEY (username) REFERENCES Users(username)
);
