/*NORMALIZE DATA*/

use proyecto2;

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
    SELECT DISTINCT INVENTOR, (SELECT id FROM Pais where nombre = PAIS_DEL_INVENTOR) as pais
	FROM TEMP T
    WHERE INVENTOR != "";
END;
$$





    
	

	select * from frontera