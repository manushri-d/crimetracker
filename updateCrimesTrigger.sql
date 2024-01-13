USE DataDubs;
DELIMITER //

CREATE TRIGGER UpdateCrime
AFTER INSERT ON cdnew
FOR EACH ROW
BEGIN
    DECLARE area_id INT;
    DECLARE victAge INT;
    
    SELECT AreaCode INTO area_id FROM Area WHERE DR_NO = NEW.DR_NO;
    
    SELECT Age INTO victAge FROM Biodata WHERE DR_NO = NEW.DR_NO;
    
    IF area_id IS NULL THEN
        INSERT INTO Area (AreaCode, AreaName, DR_NO) VALUES (NEW.Rpt_Dist_No, NEW.AREA_NAME, NEW.DR_NO);
    END IF;

    IF victAge IS NULL THEN
        INSERT INTO Biodata (Race, Age, Sex, DR_NO) VALUES (NEW.VictDescent, NEW.VictAge, NEW.VictSex, NEW.DR_NO);
    END IF;
END;

//

DELIMITER ;
