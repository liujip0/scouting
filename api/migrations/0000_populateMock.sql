INSERT INTO TeamMatchEntry (
  eventKey, matchKey, teamNumber, alliance, robotNumber, entryVersion,
  autoNote1, autoNote2, autoNote3, autoNote4, autoNote5, autoNote6, autoNote7, autoNote8, autoLeftStartingZone, autoSpeaker, autoAmp,
  teleopSpeaker, teleopAmp, teleopTrap, teleopPassed, teleopStolen, teleopChuteIntake, teleopGroundIntake, teleopEndgame, teleopSpotlight,
  postmatchDriverSkill, postmatchPlayedDefense, postmatchUnderHeavyDefense
) VALUES (
  '2025mock', 'qm1', 9991, 'Red', 1, 0,
  true, false, true, true, false, false, false, true, true, 3, 2,
  5, 4, 1, 6, 0, false, true, 'climbed', 1,
  3, false, true
);
INSERT INTO TeamMatchEntry (
  eventKey, matchKey, teamNumber, alliance, robotNumber, entryVersion,
  autoNote1, autoNote2, autoNote3, autoNote4, autoNote5, autoNote6, autoNote7, autoNote8, autoLeftStartingZone, autoSpeaker, autoAmp,
  teleopSpeaker, teleopAmp, teleopTrap, teleopPassed, teleopStolen, teleopChuteIntake, teleopGroundIntake, teleopEndgame, teleopSpotlight,
  postmatchDriverSkill, postmatchPlayedDefense, postmatchUnderHeavyDefense
) VALUES (
  '2025mock', 'qm1', 9992, 'Red', 2, 0,
  true, true, true, true, false, false, false, false, true, 5, 1,
  0, 4, 0, 2, 5, true, false, 'parked', 2,
  1, false, false
);

INSERT INTO Users (username, hashedPassword, saltToken, publicApiToken)
  VALUES (
    '9991',
    'b38ae1c3292b25b38b10119f3c83b07b369fae338589b3c56929c73e1f34d76a',
    'sjt3pceewstwwl04edgom4am9mf33zb7',
    '00be3599d340a71196115824a01a38b20c168f946c080ccab9755ce1b5fe98ab'
  )
