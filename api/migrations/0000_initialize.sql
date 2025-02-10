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
  flag text,

  noShow boolean,
  --TODO: Starting Location
  died boolean,
  playedDefense boolean,
  goodAtCoral boolean,
  goodAtAlgae boolean,
  goodAtClimb boolean,
  goodAtDefense boolean,
  goodAtWorkingWithAlliance boolean,
  --TODO: Outstanding Tasks
  comments text,

  autoCrossedRSL boolean,
  --TODO: Exact Coral Placement
  autoProcessor integer,
  autoNet integer,
  autoRemovedAlgaeFromReef boolean,

  teleopL1 integer,
  teleopL2 integer,
  teleopL3 integer,
  teleopL4 integer,
  teleopProcessor integer,
  teleopNet integer,
  teleopRemovedAlgaeFromReef boolean,
  teleopAttemptedClimb boolean,
  teleopSuccessfulClimb boolean,

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
  flag text,

  humanAttemptedNet integer,
  humanSuccessfulNet integer,
  comments text,

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
