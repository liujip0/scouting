DROP TABLE IF EXISTS TeamMatchEntry;
DROP TABLE IF EXISTS HumanPlayerEntry;

CREATE TABLE IF NOT EXISTS TeamMatchEntry(
  eventKey text,
  matchKey text,
  teamNumber integer,
  alliance text CHECK(alliance IN ('Red', 'Blue')),
  robotNumber integer CHECK(robotNumber IN (1, 2, 3)),
  deviceTeamNumber integer,
  deviceId text,
  scoutTeamNumber integer,
  scoutName text,
  flagged boolean,

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

  PRIMARY KEY (eventKey, matchKey, alliance, robotNumber, deviceTeamNumber, deviceId)
);

CREATE TABLE IF NOT EXISTS HumanPlayerEntry(
  eventKey text,
  matchKey text,
  teamNumber integer,
  alliance text CHECK(alliance IN ('Red', 'Blue')),
  robotNumber integer CHECK(robotNumber IN (4)),
  deviceTeamNumber integer,
  deviceId text,
  scoutTeamNumber integer,
  scoutName text,
  flagged boolean,

  amplifications integer,
  spotlights integer,

  PRIMARY KEY (eventKey, matchKey, alliance, robotNumber, deviceTeamNumber, deviceId)
);


DROP TABLE IF EXISTS Users;

CREATE TABLE IF NOT EXISTS Users(
  username text UNIQUE PRIMARY KEY,
  permLevel text CHECK(permLevel IN ('none', 'demo', 'team', 'datamanage', 'admin')) DEFAULT 'team',
  hashedPassword text
);


DROP TABLE IF EXISTS Matches;
DROP TABLE IF EXISTS Events;

CREATE TABLE IF NOT EXISTS Events(
  eventKey text PRIMARY KEY,
  eventName text
);

CREATE TABLE IF NOT EXISTS Matches(
  eventKey text,
  matchKey text,
  red1 integer,
  red2 integer,
  red3 integer,
  blue1 integer,
  blue2 integer,
  blue3 integer,
  PRIMARY KEY (eventKey, matchKey),
  FOREIGN KEY(eventKey) REFERENCES Events(eventKey)
);
