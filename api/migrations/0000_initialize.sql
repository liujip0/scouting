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
  autoCoralAL1 boolean, autoCoralAL2 boolean, autoCoralAL3 boolean, autoCoralAL4 boolean,
  autoCoralBL1 boolean, autoCoralBL2 boolean, autoCoralBL3 boolean, autoCoralBL4 boolean,
  autoCoralCL1 boolean, autoCoralCL2 boolean, autoCoralCL3 boolean, autoCoralCL4 boolean,
  autoCoralDL1 boolean, autoCoralDL2 boolean, autoCoralDL3 boolean, autoCoralDL4 boolean,
  autoCoralEL1 boolean, autoCoralEL2 boolean, autoCoralEL3 boolean, autoCoralEL4 boolean,
  autoCoralFL1 boolean, autoCoralFL2 boolean, autoCoralFL3 boolean, autoCoralFL4 boolean,
  autoCoralGL1 boolean, autoCoralGL2 boolean, autoCoralGL3 boolean, autoCoralGL4 boolean,
  autoCoralHL1 boolean, autoCoralHL2 boolean, autoCoralHL3 boolean, autoCoralHL4 boolean,
  autoCoralIL1 boolean, autoCoralIL2 boolean, autoCoralIL3 boolean, autoCoralIL4 boolean,
  autoCoralJL1 boolean, autoCoralJL2 boolean, autoCoralJL3 boolean, autoCoralJL4 boolean,
  autoCoralKL1 boolean, autoCoralKL2 boolean, autoCoralKL3 boolean, autoCoralKL4 boolean,
  autoCoralLL1 boolean, autoCoralLL2 boolean, autoCoralLL3 boolean, autoCoralLL4 boolean,
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
