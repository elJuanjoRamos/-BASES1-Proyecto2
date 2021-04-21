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
select SUBSTR(nombre, 1,1) AS inicial_muicipio, sum(area) AS total_area  FROM Pais
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




