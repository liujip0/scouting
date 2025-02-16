DROP TABLE IF EXISTS TeamMatchEntry;
DROP TABLE IF EXISTS HumanPlayerEntry;

CREATE TABLE IF NOT EXISTS TeamMatchEntry(
  eventKey text NOT NULL,
  matchKey text NOT NULL,
  teamNumber integer NOT NULL,
  alliance text CHECK(alliance IN ('Red', 'Blue')) NOT NULL,
  robotNumber integer CHECK(robotNumber IN (1, 2, 3)) NOT NULL,
  deviceTeamNumber integer NOT NULL,
  deviceId text NOT NULL,
  scoutTeamNumber integer NOT NULL,
  scoutName text NOT NULL,
  flag text NOT NULL,

  noShow boolean NOT NULL,
  startingLocationA boolean,
  startingLocationB boolean,
  startingLocationC boolean,
  died boolean,
  playedDefense boolean,
  goodAtCoralL1 boolean,
  goodAtCoralL2 boolean,
  goodAtCoralL3 boolean,
  goodAtCoralL4 boolean,
  goodAtAlgaeNet boolean,
  goodAtAlgaeProcessor boolean,
  goodAtClimb boolean,
  goodAtDefense boolean,
  goodAtWorkingWithAlliance boolean,
  goodAtDriving boolean,
  goodAtAuto boolean,
  removedAlgaeFromReef boolean,
  comments text,

  autoCrossedRSL boolean,
  autoCoralAL1 integer, autoCoralAL2 integer, autoCoralAL3 integer, autoCoralAL4 integer,
  autoCoralBL1 integer, autoCoralBL2 integer, autoCoralBL3 integer, autoCoralBL4 integer,
  autoCoralCL1 integer, autoCoralCL2 integer, autoCoralCL3 integer, autoCoralCL4 integer,
  autoCoralDL1 integer, autoCoralDL2 integer, autoCoralDL3 integer, autoCoralDL4 integer,
  autoCoralEL1 integer, autoCoralEL2 integer, autoCoralEL3 integer, autoCoralEL4 integer,
  autoCoralFL1 integer, autoCoralFL2 integer, autoCoralFL3 integer, autoCoralFL4 integer,
  autoCoralGL1 integer, autoCoralGL2 integer, autoCoralGL3 integer, autoCoralGL4 integer,
  autoCoralHL1 integer, autoCoralHL2 integer, autoCoralHL3 integer, autoCoralHL4 integer,
  autoCoralIL1 integer, autoCoralIL2 integer, autoCoralIL3 integer, autoCoralIL4 integer,
  autoCoralJL1 integer, autoCoralJL2 integer, autoCoralJL3 integer, autoCoralJL4 integer,
  autoCoralKL1 integer, autoCoralKL2 integer, autoCoralKL3 integer, autoCoralKL4 integer,
  autoCoralLL1 integer, autoCoralLL2 integer, autoCoralLL3 integer, autoCoralLL4 integer,
  autoProcessor integer,
  autoNet integer,

  teleopL1 integer,
  teleopL2 integer,
  teleopL3 integer,
  teleopL4 integer,
  teleopProcessor integer,
  teleopNet integer,
  teleopPark boolean,
  teleopAttemptedShallow boolean,
  teleopAttemptedDeep boolean,
  teleopSuccessfulShallow boolean,
  teleopSuccessfulDeep boolean,

  PRIMARY KEY (eventKey, matchKey, teamNumber, deviceTeamNumber, deviceId)
);

CREATE TABLE IF NOT EXISTS HumanPlayerEntry(
  eventKey text NOT NULL,
  matchKey text NOT NULL,
  teamNumber integer NOT NULL,
  alliance text CHECK(alliance IN ('Red', 'Blue')) NOT NULL,
  robotNumber integer CHECK(robotNumber IN (4)) NOT NULL,
  deviceTeamNumber integer NOT NULL,
  deviceId text NOT NULL,
  scoutTeamNumber integer NOT NULL,
  scoutName text NOT NULL,
  flag text NOT NULL,

  humanAttemptedNet integer NOT NULL,
  humanSuccessfulNet integer NOT NULL,
  comments text NOT NULL,

  PRIMARY KEY (eventKey, matchKey, teamNumber, deviceTeamNumber, deviceId)
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
