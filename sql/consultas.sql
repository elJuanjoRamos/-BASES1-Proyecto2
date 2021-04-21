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











    
    









