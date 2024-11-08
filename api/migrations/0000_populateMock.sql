INSERT INTO Teams (teamNumber, teamName) VALUES (9991, "Test Team 1");
INSERT INTO Teams (teamNumber, teamName) VALUES (9992, "Test Team 2");
INSERT INTO Teams (teamNumber, teamName) VALUES (9993, "Test Team 3");
INSERT INTO Teams (teamNumber, teamName) VALUES (9994, "Test Team 4");
INSERT INTO Teams (teamNumber, teamName) VALUES (9995, "Test Team 5");
INSERT INTO Teams (teamNumber, teamName) VALUES (9996, "Test Team 6");

INSERT INTO Events (eventKey, eventName) VALUES ("2025mock", "2025 Mock Event");
INSERT INTO TeamEventAppearance (eventKey, teamNumber) VALUES ("2025mock", 9991);
INSERT INTO TeamEventAppearance (eventKey, teamNumber) VALUES ("2025mock", 9992);
INSERT INTO TeamEventAppearance (eventKey, teamNumber) VALUES ("2025mock", 9993);
INSERT INTO TeamEventAppearance (eventKey, teamNumber) VALUES ("2025mock", 9994);
INSERT INTO TeamEventAppearance (eventKey, teamNumber) VALUES ("2025mock", 9995);
INSERT INTO TeamEventAppearance (eventKey, teamNumber) VALUES ("2025mock", 9996);

INSERT INTO Matches (eventKey, matchKey, reportedWinningAlliance, reportedRedScore, reportedBlueScore) VALUES ("2025mock", "2025mock_qm1", "Blue", 30, 40);
INSERT INTO TeamMatchEntry (matchKey, teamNumber, alliance, robotNumber, teleopSpeaker) VALUES ("2025mock_qm1", 9991, "Red", 1, 11);
INSERT INTO TeamMatchEntry (matchKey, teamNumber, alliance, robotNumber, teleopSpeaker) VALUES ("2025mock_qm1", 9992, "Red", 2, 12);
INSERT INTO TeamMatchEntry (matchKey, teamNumber, alliance, robotNumber, teleopSpeaker) VALUES ("2025mock_qm1", 9993, "Red", 3, 13);
INSERT INTO TeamMatchEntry (matchKey, teamNumber, alliance, robotNumber, teleopSpeaker) VALUES ("2025mock_qm1", 9994, "Blue", 1, 14);
INSERT INTO TeamMatchEntry (matchKey, teamNumber, alliance, robotNumber, teleopSpeaker) VALUES ("2025mock_qm1", 9995, "Blue", 2, 15);
INSERT INTO TeamMatchEntry (matchKey, teamNumber, alliance, robotNumber, teleopSpeaker) VALUES ("2025mock_qm1", 9996, "Blue", 3, 16);