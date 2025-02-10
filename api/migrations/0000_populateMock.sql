INSERT INTO TeamMatchEntry (
  eventKey, matchKey, teamNumber, alliance, robotNumber, deviceTeamNumber, deviceId, scoutTeamNumber, scoutName, flag,
  noShow, died, playedDefense, goodAtCoral, goodAtAlgae, goodAtClimb, goodAtDefense, goodAtWorkingWithAlliance, comments,
  autoCrossedRSL, autoProcessor, autoNet, autoRemovedAlgaeFromReef,
  teleopL1, teleopL2, teleopL3, teleopL4, teleopProcessor, teleopNet, teleopRemovedAlgaeFromReef, teleopAttemptedClimb, teleopSuccessfulClimb
) VALUES
  ('2025mock','qm1', 9991, 'Red', 1, 9991, 'device1', 9991, 'Naida L', '', false, false, false, false, false, false, false, false, 'Good job!', false, 1, 2, false, 1, 2, 3, 4, 5, 6, false, true),
  ('2025mock','qm1', 9992, 'Red', 2, 9992, 'device2', 9992, 'Leila O', '', false, false, false, false, false, false, false, false, 'Good job!', false, 1, 2, false, 1, 2, 3, 4, 5, 6, false, true),
  ('2025mock','qm1', 9993, 'Red', 3, 9993, 'device3', 9993, 'Melvin Y', '', false, false, false, false, false, false, false, false, 'Good job!', false, 1, 2, false, 1, 2, 3, 4, 5, 6, false, true),
  ('2025mock','qm1', 9994, 'Blue', 1, 9994, 'device4', 9994, 'Callie J', '', false, false, false, false, false, false, false, false, 'Good job!', false, 1, 2, false, 1, 2, 3, 4, 5, 6, false, true),
  ('2025mock','qm1', 9995, 'Blue', 2, 9995, 'device5', 9995, 'Ali K', '', false, false, false, false, false, false, false, false, 'Good job!', false, 1, 2, false, 1, 2, 3, 4, 5, 6, false, true),
  ('2025mock','qm1', 9996, 'Blue', 3, 9996, 'device6', 9996, 'Ivan I', '', false, false, false, false, false, false, false, false, 'Good job!', false, 1, 2, false, 1, 2, 3, 4, 5, 6, false, true);

INSERT INTO HumanPlayerEntry (
  eventKey, matchKey, teamNumber, alliance, robotNumber, deviceTeamNumber, deviceId, scoutTeamNumber, scoutName, flag,
  humanAttemptedNet, humanSuccessfulNet, comments
) VALUES
  ('2025mock','qm1', 9991, 'Red', 1, 9991, 'device1', 9991, 'Naida L', '', 5, 3,''),
  ('2025mock','qm1', 9992, 'Red', 2, 9992, 'device2', 9992, 'Leila O', '', 1, 1,''),
  ('2025mock','qm1', 9993, 'Red', 3, 9993, 'device3', 9993, 'Melvin Y', '', 2, 1,''),
  ('2025mock','qm1', 9994, 'Blue', 1, 9994, 'device4', 9994, 'Callie J', '', 3, 2,''),
  ('2025mock','qm1', 9995, 'Blue', 2, 9995, 'device5', 9995, 'Ali K', '', 4, 1,''),
  ('2025mock','qm1', 9996, 'Blue', 3, 9996, 'device6', 9996, 'Ivan I', '', 3, 3,'');

INSERT INTO Users (username, hashedPassword)
  VALUES (
    '9991',
    '$2y$10$xYijwMdaddvORBDUl7Ao/.OQSVJ4z6F0muElMMjV/F/xuQvqJ/TWW'
  );

INSERT INTO Events (eventKey, eventName)
  VALUES ('2025mock', '2025 mock event 0');

INSERT INTO Matches (eventKey, matchKey, red1, red2, red3, blue1, blue2, blue3)
  VALUES ('2025mock', 'qm2', 3494, 1501, 868, 4982, 3890, 135);