-- mysql database initializations
-- Initialize User
Insert Into users(username, token, password, email, cell, fname, lname, birthday)
Values ('TomSmith', '13806t', " ", 'Tom31@Gmail.Com', 9135821111, 'Tom', 'Smith', '1999-01-09');


Insert Into users(username, token, password, email, cell, fname, lname, birthday)
Values ('Testuser2', " ", '14a41ts', 'Test2@Gmail.Com', 9135821111, 'Test2', 'User', '2000-01-01');


-- Get Number Of Entries
Select Count(*)As Count From Users;
	          
			  
-- Initialize Academic
Insert Into academic(userId, title, category, eventTime, location, completed)
Values (1, 'Eecs 582', 'Course', '2023-01-18', 'Eaten 2', 0); -- zero for false

Insert Into academic(userId, title, category, eventTime, location, completed)
Values (2, 'Eng 300', 'Course', '2023-01-18', 'Eaten 2', 1 ); -- one for 1


Insert Into academic(userId, title, category, eventTime, location, completed, notes)
Values (1, 'Math 526', 'Course', '2023-01-18', 'Eaten 2', 0, 'Bring Calculator');

-- Retreive All Of Tom's Courses:
Select * From academic Where userId = (Select id As userId From users Where username="Tomsmith");

-- Get The Streak For Academic Courses For 1/18/23 For Tom ----------------------------
-- Queries
-- 1)Total Completed
Select Count(*)As completed From academic Where 
	userId = (Select Id From Users Where Username="Tomsmith") And EventTime='2023-01-18' And Completed=1;
-- 2) Total Courses
Select Count(*)As total From Aacademic Where 
	userId = (Select Id From Users Where Username="Tomsmith") And EventTime='2023-01-18';


-- Initialize health 
Insert Into health(userId, title, category, eventTime, notes, completed)
Values (1, "Meditation", "Self-Care", '2023-01-13', "Take Time For Yourself", 1 ) ;

Insert Into health(userId, title, category, eventTime, notes, completed)
Values (1, "Marathon Training", "Fitness", '2023-01-13', "20 Days To Go", 1 ) ;

Insert Into health(userId, title, category, eventTime, notes, completed)
Values (2, "Weights Training", "Fitness", '2023-01-13', "20 Lbs", 1 ) ;
 
 
Insert Into health(userId, title, category, eventTime, notes, completed)
Values (2, "Take Medication", "Medication", '2023-01-15', "", 1 ) ;
 
 
-- Initialize travel
Insert Into travel(userId, title, category, eventTime, location, notes, completed)
Values (1, "First Day Of Class!", "School", '2023-01-18', "Ku Lawrence", "11:00am - Physics", False) ;

Insert Into travel(userId, title, category, eventTime, location, notes, completed)
Values (1, "Blockchain Competition - Dallas", "School", '2023-01-25', "Mci Airport", "8:00am - Departure", False) ;


-- Initialize social
Insert Into social(userId, title, category, eventTime, Notes)
Values (1, "Intern social", "Work", '2023-01-23',  "5-7pm");

-- Initialize streaks
Insert Into streaks(userId, academicStreak , socialStreak , healthStreak , travelStreak )
Values (1, 0, 0, 0, 0);

Insert Into streaks(userId, academicStreak , socialStreak , healthStreak , travelStreak )
Values (2, 0, 1, 0, 0);

-- Check Table
Select * From users;

-- Idea for streaks table
-- Comparing The Two Values In Code Editor
-- A_Streak; --Global Streak Var

-- Completed = "Select Count(*)As Completed From Academic1 Where 
	-- userId = (Select Id From Users Where Username="Tomsmith") And EventTime=1/18/23 And Completed=1"

-- Total = "Select Count(*)As Total From Academic1 Where 
	-- userId = (Select Id From Users Where Username="Tomsmith") And EventTime=1/18/23

-- -- Adding The Info Into streaks Table

-- If (Completed == Total)
	-- "Insert Into streaks(userId, Astreaks)
		-- Value({userId},{A_Streak} + 1)"
-- Else streaks(Astreak) 
	-- A_Streak = 0
