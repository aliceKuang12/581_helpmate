-- turns on / off safe mode
SET SQL_SAFE_UPDATES = 1;

Create table imageRefs (
	userId int,
    profile1 varchar(1000),
    social1 varchar(1000),
    social2 varchar(1000),
    social3 varchar(1000),
    travel1 varchar(1000),
    travel2 varchar(1000),
    travel3 varchar(1000)
);

-- test
Insert into imageRefs(userId, profile1) values (2, "C:/Users/akuan/Pictures/screensaver/ku.jpg");

Select * from imageRefs;