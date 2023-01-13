
-- Initialize User
Insert Into Users(Username, Password, Email, Cell, FirstName, LastName, Birthday)
Values ('TomSmith', '13806t', 'Tom31@Gmail.Com', 9135821111, 'Tom', 'Smith', '09/01/99');


Insert Into Users(Username, Password, Email, Cell, FirstName, LastName, Birthday)
Values ('Testuser2', '14a41ts', 'Test2@Gmail.Com', 9135821111, 'Test2', 'User', '01/01/00');


-- Get Number Of Entries
Select Count(*)As Count From Users;
	          
			  
-- Initialize Academic
Insert Into Academic(UserId, Title, Category, EventTime, Location, Completed)
Values (1, 'Eecs 582', 'Course', 1/18/23, 'Eaten 2', 'False');

Insert Into Academic(UserId, Title, Category, EventTime, Location, Completed)
Values (2, 'Eng 300', 'Course', 1/18/23, 'Eaten 2', 'True' );


Insert Into Academic(UserId, Title, Category, EventTime, Location, Completed, Notes)
Values (1, 'Math 526', 'Course', 1/18/23, 'Eaten 2', 'False', 'Bring Calculator');

-- Retreive All Of Tom's Courses:
Select * From Academic Where UserId = (Select Id As UserId From Users Where Username="Tomsmith");

-- Get All Academic Courses For 1/18/23 For Tom
Select * From Academic Where 
	UserId = (Select Id From Users Where Username="Tomsmith") And EventTime=1/18/23;


-- Get The Streak For Academic Courses For 1/18/23 For Tom ----------------------------
-- Queries
-- 1)Total Completed
Select Count(*)As Completed From Academic Where 
	UserId = (Select Id From Users Where Username="Tomsmith") And EventTime=1/18/23 And Completed=True;
-- 2) Total Courses
Select Count(*)As Total From Academic Where 
	UserId = (Select Id From Users Where Username="Tomsmith") And EventTime=1/18/23;


-- Initialize Health 
Insert Into Health(UserId, Title, Category, EventTime, Notes, Completed)
Values (1, "Meditation", "Self-Care", 1/13/23, "Take Time For Yourself", True ) ;

Insert Into Health(UserId, Title, Category, EventTime, Notes, Completed)
Values (1, "Marathon Training", "Fitness", 1/13/23, "20 Days To Go", True ) ;

Insert Into Health(UserId, Title, Category, EventTime, Notes, Completed)
Values (2, "Weights Training", "Fitness", 1/13/23, "20 Lbs", True ) ;
 
 
Insert Into Health(UserId, Title, Category, EventTime, Notes, Completed)
Values (2, "Take Medication", "Medication", 1/15/23, "", True ) ;
 
 
-- Initialize Travel
Insert Into Travel(UserId, Title, Category, EventTime, Address, Notes, Completed)
Values (1, "First Day Of Class!", "School", 1/18/23, "Ku Lawrence", "11:00am - Physics", False) ;

Insert Into Travel(UserId, Title, Category, EventTime, Address, Notes, Completed)
Values (1, "Blockchain Competition - Dallas", "School", 1/25/23, "Mci Airport", "8:00am - Departure", False) ;


-- Initialize Social
Insert Into Social(UserId, Title, Category, EventTime, Notes)
Values (1, "Intern Social", "Work", 1/23/23,  "5-7pm");

-- Initialize Streaks
Insert Into Streaks(UserId, AStreak, SStreak, HStreak, TSTreak)
Values (1, 0, 0, 0, 0);

Insert Into Streaks(UserId, AStreak, SStreak, HStreak, TSTreak)
Values (2, 0, 1, 0, 0);

-- Check Table
Select * From Users;
Select * From Academic;
Select * From Health;
Select * From Travel;
Select * From Social;
Select * From Streaks;

-- Idea for Streaks table
-- Comparing The Two Values In Code Editor
-- A_Streak; --Global Streak Var

-- Completed = "Select Count(*)As Completed From Academic1 Where 
	-- UserId = (Select Id From Users Where Username="Tomsmith") And EventTime=1/18/23 And Completed=True"

-- Total = "Select Count(*)As Total From Academic1 Where 
	-- UserId = (Select Id From Users Where Username="Tomsmith") And EventTime=1/18/23

-- -- Adding The Info Into Streaks Table

-- If (Completed == Total)
	-- "Insert Into Streaks(UserId, Astreaks)
		-- Value({UserId},{A_Streak} + 1)"
-- Else Streaks(Astreak) 
	-- A_Streak = 0
