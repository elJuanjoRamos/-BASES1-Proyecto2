/*NORMALIZE DATA*/

use proyecto2;


DELIMITER $$
CREATE FUNCTION 
   SPLIT_STRING ( s VARCHAR(1024) , del CHAR(1) , i INT)
   RETURNS VARCHAR(1024)
   DETERMINISTIC -- always returns same results for same input parameters
   BEGIN
        DECLARE n INT ;
        -- get max number of items
        SET n = LENGTH(s) - LENGTH(REPLACE(s, del, '')) + 1;
        IF i > n THEN
            RETURN NULL ;
        ELSE
            RETURN SUBSTRING_INDEX(SUBSTRING_INDEX(s, del, i) , del , -1 ) ;        
        END IF;
    END
$$


DELIMITER $$
CREATE PROCEDURE INSERT_CONTINET()
BEGIN
	INSERT INTO Continente(nombre) 
    (SELECT DISTINCT REGION_PADRE FROM carga3);
END;
$$
CALL

DELIMITER $$
CREATE PROCEDURE INSERT_REGION()
BEGIN
	INSERT INTO Region(nombre, idContinente) 
    (SELECT nombre_region, (SELECT id FROM continente WHERE nombre = C3.REGION_PADRE) as continente FROM carga3 AS C3);
END;
$$

DELIMITER $$
CREATE PROCEDURE INSERT_PAIS()
BEGIN
	INSERT INTO Pais(nombre, poblacion, area, capital, region) 
    SELECT DISTINCT PAIS_DEL_INVENTOR, CAST(POBLACION_DEL_PAIS AS DECIMAL(12,2)) as POBLACION_DEL_PAIS,
	CAST(AREA_EN_KM2 AS DECIMAL(12,2)) as AREA_EN_KM2, CAPITAL, (SELECT id FROM region WHERE nombre = REGION_DEL_PAIS) as id   FROM TEMP T;
END;
$$

DELIMITER $$
CREATE PROCEDURE INSERT_FRONTERA()
BEGIN
	INSERT INTO Frontera(pais, front, norte, sur, este, oeste) 
    SELECT DISTINCT 
	(select id from pais where nombre = PAIS_DEL_INVENTOR) as pais, 
	(select id from pais where nombre = FRONTERA_CON) as frontera,  
	CAST(NORTE AS CHAR), 
	CAST(SUR AS CHAR), 
	CAST(ESTE AS CHAR), 
	CAST(OESTE AS CHAR) 
	FROM TEMP T;
END;
$$

DELIMITER $$
CREATE PROCEDURE INSERT_INVENTOR()
BEGIN
	INSERT INTO Inventor(nombre, pais) 
    SELECT DISTINCT TRIM(INVENTOR), (SELECT id FROM Pais where nombre = PAIS_DEL_INVENTOR) as pais
	FROM TEMP T
    WHERE 
    INVENTOR != ""
    AND
    INVENTOR NOT LIKE '%;%';
    
    INSERT INTO Inventor(nombre, pais) 
    SELECT DISTINCT TRIM((SELECT SPLIT_STRING(INVENTOR,';',1))) as uno,
	(SELECT id FROM Pais where nombre = PAIS_DEL_INVENTOR) as pais
	FROM TEMP 
	WHERE INVENTOR LIKE '%;%'
    AND NOT EXISTS(SELECT nombre from Inventor where nombre = TRIM((SELECT SPLIT_STRING(INVENTOR,';',1))));
    
    
    INSERT INTO Inventor(nombre, pais) 
    SELECT DISTINCT TRIM((SELECT SPLIT_STRING(INVENTOR,';',2))) as dos,
	(SELECT id FROM Pais where nombre = PAIS_DEL_INVENTOR) as pais
	FROM TEMP 
	WHERE INVENTOR LIKE '%;%'
    AND NOT EXISTS(SELECT nombre from Inventor where nombre = TRIM((SELECT SPLIT_STRING(INVENTOR,';',2))));
    
    
    INSERT IGNORE INTO Inventor(nombre, pais) 
    SELECT DISTINCT TRIM((SELECT SPLIT_STRING(INVENTOR,';',3))) as tres,
	(SELECT id FROM Pais where nombre = PAIS_DEL_INVENTOR) as pais
	FROM TEMP 
	WHERE INVENTOR LIKE '%;%'
	AND TRIM((SELECT SPLIT_STRING(INVENTOR,';',3))) IS NOT NULL
    AND NOT EXISTS(SELECT nombre from Inventor where nombre = TRIM((SELECT SPLIT_STRING(INVENTOR,';',3))));
    
END;
$$


DELIMITER $$
CREATE PROCEDURE INSERT_INVENTO()
BEGIN
	INSERT INTO Invento(nombre, anio, pais) 
	SELECT DISTINCT INVENTO, TRUNCATE(CAST(ANIO_DEL_INVENTO AS DECIMAL(10,2)),0) as anio, (SELECT id FROM Pais where nombre = PAIS_DEL_INVENTO) as pais
	FROM TEMP T
    WHERE INVENTO != "";    
END;
$$


DELIMITER $$
CREATE PROCEDURE INSERT_INVENTO_INVENTO()
BEGIN
	INSERT INTO Inventor_Invento(idInvento, idInventor)
	SELECT DISTINCT 
	(SELECT id from Invento where nombre = INVENTO and anio = ANIO_DEL_INVENTO) AS idInvento, 
	(SELECT id from Inventor where nombre = INVENTOR) AS idInventor
	FROM TEMP T
	WHERE INVENTO != ""
	AND INVENTOR NOT LIKE '%;%';  
    
    INSERT INTO Inventor_Invento(idInvento, idInventor)
	SELECT DISTINCT 
	(SELECT id from Invento where nombre = INVENTO and anio = ANIO_DEL_INVENTO) AS idInvento, 
	(SELECT id from Inventor where nombre = TRIM((SELECT SPLIT_STRING(INVENTOR,';',1)))) AS idUno
	FROM TEMP T
	WHERE INVENTO != ""
	AND INVENTOR LIKE '%;%';  
    
    INSERT INTO Inventor_Invento(idInvento, idInventor)
	SELECT DISTINCT 
	(SELECT id from Invento where nombre = INVENTO and anio = ANIO_DEL_INVENTO) AS idInvento, 
	(SELECT id from Inventor where nombre = TRIM((SELECT SPLIT_STRING(INVENTOR,';',2)))) AS idDos
	FROM TEMP T
	WHERE INVENTO != ""
	AND INVENTOR LIKE '%;%';  
    
	
    INSERT INTO Inventor_Invento(idInvento, idInventor)
    SELECT DISTINCT 
	(SELECT id from Invento where nombre = INVENTO and anio = ANIO_DEL_INVENTO) AS idInvento, 
	(SELECT id from Inventor where nombre = TRIM((SELECT SPLIT_STRING(INVENTOR,';',3)))) AS idTres
	FROM TEMP T
	WHERE INVENTO != ""
	AND INVENTOR LIKE '%;%'
	AND (SELECT SPLIT_STRING(INVENTOR,';',3)) IS NOT NULL;  

    
END;
$$

DELIMITER $$
CREATE PROCEDURE INSERT_PROFESIONAL()
BEGIN
	INSERT INTO Profesional(nombre, salario, contrato, comision) 
	SELECT DISTINCT PROFESIONAL_ASIGANDO_AL_INVENTO, 
	CAST(SALARIO AS DECIMAL(10,2)), 
	STR_TO_DATE(FECHA_CONTRATO_PROFESIONAL, '%d/%m/%Y') AS fecha, 
	TRUNCATE(CAST(COMISION AS DECIMAL(10,2)),0)
	FROM TEMP T
	WHERE PROFESIONAL_ASIGANDO_AL_INVENTO != "" AND COMISION != "";    
	INSERT INTO Profesional(nombre, salario, contrato, comision) 
	SELECT DISTINCT PROFESIONAL_ASIGANDO_AL_INVENTO, 
	CAST(SALARIO AS DECIMAL(10,2)), 
	STR_TO_DATE(FECHA_CONTRATO_PROFESIONAL, '%d/%m/%Y') AS fecha, 
	NULL
	FROM TEMP T
	WHERE PROFESIONAL_ASIGANDO_AL_INVENTO != "" AND COMISION = "";    
END;
$$
      
DELIMITER $$
CREATE PROCEDURE INSERT_ASIGNACION_INVENTO()
BEGIN
	INSERT INTO Asignacion_Invento(profesional, invento) 
	SELECT DISTINCT 
    (SELECT ID FROM Profesional WHERE nombre = PROFESIONAL_ASIGANDO_AL_INVENTO) as id,
	(SELECT ID FROM Invento WHERE nombre = INVENTO AND anio = ANIO_DEL_INVENTO) as invent
	FROM TEMP T
	WHERE INVENTO != "";
END;
$$

DELIMITER $$
CREATE PROCEDURE INSERT_AREA()
BEGIN
	INSERT INTO Area(nombre, rankin, descripcion) 
    SELECT DISTINCT AREA_INVEST_DEL_PROF, RANKING, "" AS DESCRIPCION
    FROM TEMP
	WHERE INVENTO != "";
END;
$$


DELIMITER $$
CREATE PROCEDURE INSERT_JEFE_AREA()
BEGIN
	INSERT INTO Jefe_Area(profesional, area) 
    SELECT DISTINCT 
    (SELECT ID FROM Profesional WHERE nombre = PROFESIONAL_ASIGANDO_AL_INVENTO), 
    (SELECT ID FROM Area WHERE nombre = EL_PROFESIONAL_ES_JEFE_DEL_AREA)
    FROM TEMP
	WHERE INVENTO != "" AND EL_PROFESIONAL_ES_JEFE_DEL_AREA != "" AND EL_PROFESIONAL_ES_JEFE_DEL_AREA != "TODAS";
END;
$$

DELIMITER $$
CREATE PROCEDURE INSERT_PROFESIONAL_AREA()
BEGIN
	INSERT INTO Profe_Area(profesional, area) 
    SELECT DISTINCT 
    (SELECT ID FROM Profesional WHERE nombre = PROFESIONAL_ASIGANDO_AL_INVENTO), 
    (SELECT ID FROM Area WHERE nombre = AREA_INVEST_DEL_PROF)
    FROM TEMP
	WHERE INVENTO != "";
END;
$$

DELIMITER $$
CREATE PROCEDURE INSERT_ENCUESTA()
BEGIN
	INSERT INTO Encuesta(nombre) 
	SELECT DISTINCT NOMBRE_ENCUESTA from Carga2;
END;
$$

DELIMITER $$
CREATE PROCEDURE INSERT_PREGUNTA()
BEGIN
	INSERT INTO Pregunta(pregunta, encuensta) 
	SELECT DISTINCT 
    PREGUNTA,  
    (SELECT ID FROM Encuesta WHERE nombre = NOMBRE_ENCUESTA)
    from Carga2;
END;
$$

DELIMITER $$
CREATE PROCEDURE INSERT_RESPUESTA()
BEGIN
	INSERT INTO Respuesta(respuesta, pregunta) 
	SELECT DISTINCT RESPUESTAS_POSIBLES, (SELECT ID FROM PREGUNTA WHERE pregunta = C2.PREGUNTA) FROM Carga2 C2;
END;
$$

DELIMITER $$
CREATE PROCEDURE INSERT_RESPUESTA_CORRECTA()
BEGIN
	INSERT INTO Respuesta_correcta(respuesta, pregunta) 
	SELECT DISTINCT RESPUESTA_CORRECTA, (SELECT ID FROM PREGUNTA WHERE pregunta = C2.PREGUNTA) FROM Carga2 C2
    WHERE RESPUESTA_CORRECTA != "";
	INSERT INTO Respuesta_correcta(respuesta, pregunta) 
	SELECT DISTINCT NULL, (SELECT ID FROM PREGUNTA WHERE pregunta = C2.PREGUNTA) FROM Carga2 C2
    WHERE RESPUESTA_CORRECTA = "";
END;
$$


DELIMITER $$
CREATE PROCEDURE INSERT_PAIS_RESPUESTA()
BEGIN
	INSERT INTO Pais_Respuesta(pais, pregunta, encuesta, letra) 
	SELECT DISTINCT 
	(SELECT ID FROM PAIS WHERE nombre = TRIM(C2.PAIS)) AS pais, 
	(SELECT ID FROM PREGUNTA WHERE pregunta = C2.PREGUNTA) AS pregunta, 
	(SELECT ID FROM ENCUESTA WHERE nombre = C2.NOMBRE_ENCUESTA) AS encuesta,
	RESPUESTA_PAIS FROM Carga2 C2;
END;
$$
    
	



