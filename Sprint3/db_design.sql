CREATE TABLE IF NOT EXISTS Users (     --(Hash entire table for security)

    Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	FirstName NVARCHAR(25),
	LastName NVARCHAR(25),
    Username NVARCHAR(64) NOT NULL,
    Password NVARCHAR(128) NOT NULL,
	Cell NVARCHAR(20),
	Birthday DATETIME,
	ProfilePic BLOB,
	StreetAddress NVARCHAR(100),
	HomeState NVARCHAR(2),
	Zip NVARCHAR (10),
	Email NVARCHAR(128) NOT NULL --Unique Id
)



CREATE TABLE Academic( 
    Id INTEGER PRIMARY KEY NOT NULL,
	Title VARCHAR(25) NOT NULL,
	Category VARCHAR(25), --Homework, Exam, Assignment/Lab
	EventTime DATETIME NOT NULL,
	Location VARCHAR(50),
	Notes VARCHAR(256), 
	Completed BOOL, 
	CreatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	ForeignKey (UserId) REFERENCES User(Id)
);

CREATE TABLE Social( 
    Id INTEGER PRIMARY KEY NOT NULL,
	Title VARCHAR(25) NOT NULL,
	Category VARCHAR(25), --Family Gathering, Club, etc.
	EventTime DATETIME NOT NULL,
	Notes VARCHAR(256), 	
	Completed BOOL, 
	Photo BLOB,
	CreatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Health( 
    Id INTEGER PRIMARY KEY NOT NULL,
	Title VARCHAR(25) NOT NULL,
	Category VARCHAR(25), --Recurring, Gathering, Club, etc.
	EventTime DATETIME NOT NULL,
	Steps INTEGER,
	Notes VARCHAR(256), 
	Completed BOOL, 
	CreatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	ForeignKey (UserId) REFERENCES User(Id)
);

--Be able to store image of picture for now (BLOB object)
CREATE TABLE Travel( 
    Id INTEGER PRIMARY KEY NOT NULL,
	Title VARCHAR(25) NOT NULL,
	Category VARCHAR(25), --Vacation
	EventTime DATETIME NOT NULL, 
	StreetAddress VARCHAR(256),
	City VARCHAR(25),
	DestState VARCHAR(2),
	Zipcode VARCHAR(10),
	Notes VARCHAR(256), 
	Ticket BLOB,
	Completed BOOL, 
	CreatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	ForeignKey (UserId) REFERENCES User(Id)
);

--Streaks will reference all four modules
CREATE TABLE Streaks( 
    Id INTEGER PRIMARY KEY NOT NULL,
	Category VARCHAR(25) NOT NULL,
	CompleteRate REAL, 
	CreatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (AcadComplete) REFERENCES Academic(Completed),
	FOREIGN KEY (SocialComplete) REFERENCES Social(Completed),
	FOREIGN KEY (HealthComplete) REFERENCES Health(Completed),
	FOREIGN KEY (TravelComplete) REFERENCES Travel(Completed),
	ForeignKey (UserId) REFERENCES User(Id)
);