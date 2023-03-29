Create Table Users(
	Id Integer Primary Key Autoincrement,
	Username Text Not Null,
	Password Text Not Null,
	Email Text Not Null,
	Cell Text,
	FirstName Text,
	LastName Text,
	Birthday Date,
	ProfilePic Blob,
	Address Text
);

Create Table Academic(	
	UserId Int Not Null,
	Title Text Not Null,
	Category Text, -- Course, Exam, Assignment
	EventTime Datetime Not Null,
	Location Text,
	Notes Text,
	Completed Bool,
	CreatedOn Datetime Not Null Default Current_Timestamp,
	Foreign Key(UserId) References Users(Id)
);

Create Table Social(
	UserId Int Not Null,
	Title Text Not Null,
	Category Text, --Work, Leisure
	EventTime Date Not Null,
	Notes Text,
	Completed Bool,
	Photo Blob,
	CreatedOn Datetime Not Null Default Current_Timestamp,
	Foreign Key(UserId) References Users(Id)
);

Create Table Health(
	UserId Int Not Null,
	Title Text Not Null,
	Category Text, --Medication, Self-Care, Fitness, Nutrition
	EventTime Date Not Null,
	Notes Text,
	Completed Bool,
	CreatedOn Datetime Not Null Default Current_Timestamp,
	Foreign Key(UserId) References Users(Id)
);

Create Table Travel(
	UserId Int Not Null,
	Title Date Not Null,
	Category Text, --Work, Leisure
	EventTime Date Not Null,
	Address Text,
	Notes Text,
	Ticket Blob,
	Completed Bool,
	CreatedOn Datetime Not Null Default Current_Timestamp,
	Foreign Key(UserId) References Users(Id)
);

Create Table Streaks(
	UserId Int Not Null,
	AStreak Int,
	SStreak Int,
	HStreak Int,
	TStreak Int,
	Foreign Key(UserId) References Users(Id)
);


