USE DataDubs;

DELIMITER //

CREATE PROCEDURE getCrime(IN p_UserID VARCHAR(255), OUT occurrences INT)
BEGIN
    DECLARE u_Age INT;
    DECLARE u_Race VARCHAR(255);
    DECLARE u_Sex VARCHAR(255);
    DECLARE u_AreaName VARCHAR(255);
    DECLARE done INT DEFAULT FALSE;


    DECLARE areaCursor CURSOR FOR
        SELECT Age, Race, Sex, AreaName
        FROM User
        WHERE UserId = p_UserID;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN areaCursor;


    FETCH areaCursor INTO u_Age, u_Race, u_Sex, u_AreaName;

    crime_loop: LOOP
        IF done THEN
            LEAVE crime_loop;
        END IF;

        IF u_Age <= 18 THEN 
            SELECT COUNT(*) INTO occurrences
            FROM Area a
            JOIN Biodata b ON a.DR_NO = b.DR_NO 
            WHERE a.AreaName = u_AreaName AND u_Sex = b.Sex
            GROUP BY a.AreaName;
        ELSE 
            SELECT COUNT(*) INTO occurrences
            FROM Area a
            JOIN Biodata b ON a.DR_NO = b.DR_NO 
            WHERE a.AreaName = u_AreaName AND u_Sex = b.Sex AND (u_Age <= 10 + b.Age AND u_Age >= b.Age - 10)
            GROUP BY a.AreaName;
        END IF;

        FETCH areaCursor INTO u_Age, u_Race, u_Sex, u_AreaName;
    END LOOP;

    CLOSE areaCursor;
END //

DELIMITER ;
