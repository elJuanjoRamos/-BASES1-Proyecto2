USE Proyecto2;
/*CONSULTA 1*/
SELECT profesional, P.nombre AS NOMBRE_PROFESIONAL, COUNT(*) as inventos_asignados FROM Asignacion_Invento AI
JOIN Profesional P on P.id = AI.profesional
GROUP BY profesional
ORDER BY inventos_asignados desc;

/*CONSULTA 2*/

SELECT PR.pais as idPais, P.nombre, COUNT(*) as total_respuestas FROM Pais_Respuesta PR
JOIN PAIS P on P.id = PR.pais
GROUP BY PR.pais 
ORDER BY PR.pais  ASC;

/*CONSULTA 3 */
SELECT id, nombre FROM PAIS
WHERE 
id not in(SELECT DISTINCT PAIS FROM Inventor)
AND
id in(SELECT DISTINCT pais FROM FRONTERA where front is null)
order by nombre asc;

/*CONSULTA 4*/
select PA.area as idAarea, A.nombre as area, P.nombre as Jefe_Area, P1.nombre as Subordinado  from Profe_Area PA
JOIN Area A on PA.area = A.id
JOIN Jefe_Area JA on JA.area = A.id
JOIN Profesional P on JA.profesional = P.id
JOIN Profesional P1 on PA.profesional = P1.id
ORDER BY Jefe_Area ASC;

/*CONSULTA 5*/
CREATE VIEW C51 AS
SELECT P1.nombre, PA.area,  P1.salario FROM Profe_Area PA
JOIN Profesional P1 on PA.profesional = P1.id
ORDER BY area asc;
CREATE VIEW C52 AS
SELECT area, sum(salario) as total_salario, Count(area) as total_empleados, Round(sum(salario)/Count(area),2) as prom_salario from C51
GROUP BY area
ORDER BY area asc;

SELECT P1.nombre, PA.area,  P1.salario FROM Profe_Area PA
JOIN Profesional P1 on PA.profesional = P1.id
WHERE P1.salario > (SELECT prom_salario FROM C52 WHERE area = PA.area)
ORDER BY area asc;



/*CONSULTA 6*/

/*CONSULTA 7*/
SELECT P.nombre as Investigador, AI.invento as idInvento, I.nombre as invento, I.anio FROM Asignacion_Invento AI
JOIN Invento I on I.id = AI.invento
JOIN Profesional P on P.id = AI.profesional
JOIN Profe_Area PA on P.id = PA.profesional
JOIN Area A on PA.area = A.id
WHERE A.nombre = 'optica';

/*CONSULTA 8*/
select SUBSTR(nombre, 1,1) AS inicial_pais, sum(area) AS total_area  FROM Pais
group by SUBSTR(nombre, 1,1)
order by inicial_muicipio asc;

/*CONSULTA 9*/

SELECT IR.nombre as Inventor, I.nombre as Invento, I.anio as Anio_Invento, P.nombre as Pais_Invento FROM Inventor_Invento II
JOIN Invento I on I.id = II.idinvento
JOIN Inventor IR on IR.id = II.idInventor
JOIN Pais P on P.id = IR.pais
WHERE SUBSTR(IR.nombre, 1,2) = 'Be';

/*CONSULTA 10*/

SELECT IR.nombre as Inventor, I.nombre as Invento, I.anio as Anio_Invento, P.nombre as Pais_Invento FROM Inventor_Invento II
JOIN Invento I on I.id = II.idinvento
JOIN Inventor IR on IR.id = II.idInventor
JOIN Pais P on P.id = IR.pais
WHERE 
SUBSTR(IR.nombre, 1,1) = 'B'
AND
(RIGHT(IR.nombre, 1) = 'r'
OR
RIGHT(IR.nombre, 1) = 'n')
AND
(1801 <= I.anio AND I.anio <= 1900);

/*CONSULTA 11*/
SELECT * FROM (SELECT pais, P.nombre as nombre, P.area as area, count(*) as cant_fronteras FROM Frontera
JOIN Pais P on P.id = pais
GROUP BY pais) T
WHERE T.cant_fronteras >= 7
ORDER BY area desc;

/*CONSULTA 12*/

SELECT Invento.id, Invento.nombre, anio, P.nombre FROM Invento
JOIN Pais P on P.id = Invento.pais
WHERE SUBSTR(Invento.nombre, 1,1) = 'L';
/*CONSULTA 13*/

SELECT id, nombre, salario, contrato, comision, (salario+comision) as total_Salario FROM Profesional
WHERE Comision != ""
AND 0.25*salario < TRUNCATE(CAST(comision AS DECIMAL(6,2)),0);

/*CONSULTA 14*/

SELECT encuesta as id, E.nombre as Nombre_Encuesta, COUNT(pais) as total_paises FROM Pais_Respuesta
JOIN Encuesta E on E.id = Pais_Respuesta.encuesta
GROUP BY encuesta
ORDER BY total_paises DESC;

/*CONSULTA 15*/
SELECT P.id, P.nombre, P.poblacion, P.area, P.capital, R.nombre, C.nombre FROM Pais P 
JOIN Region R on P.region = R.id
JOIN Continente C on R.idContinente = C.id
WHERE P.poblacion  > (SELECT sum(poblacion) as total_poblacion_ca FROM PAIS P1
JOIN Region R on P1.region = R.id
where R.nombre = 'Centro America');


/*CONSULTA 16*/


/*CONSULTA 17*/
SELECT I.nombre as invento, INV.nombre as inventor FROM Inventor_Invento II 
JOIN Invento I ON II.idInvento = I.id
JOIN Inventor INV ON II.idInventor = INV.id
WHERE I.anio = ( 
SELECT I.anio FROM Inventor_Invento II
JOIN Invento I ON II.idInvento = I.id
JOIN Inventor INV ON II.idInventor = INV.id
WHERE INV.nombre = 'BENZ');

/*CONSULTA 18*/

SELECT P.nombre, P.poblacion, P.area FROM Frontera F
JOIN Pais P on F.pais = P.id
WHERE F.front IS NULL
AND P.area >= (SELECT area FROM Pais WHERE nombre = 'Japon');


/*CONSULTA 19*/
SELECT P.nombre AS Pais, P1.nombre AS Frontera  FROM Frontera F
JOIN Pais P on F.pais = P.id
JOIN Pais P1 on F.front = P1.id
WHERE F.front IS NOT NULL;

/*CONSULTA 20*/

