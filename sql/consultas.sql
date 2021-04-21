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
order by id asc;



SELECT * FROM (SELECT DISTINCT 
	(select id from pais where nombre = PAIS_DEL_INVENTOR) as pais, 
	(select id from pais where nombre = FRONTERA_CON) as frontera,  
	CAST(NORTE AS CHAR), 
	CAST(SUR AS CHAR), 
	CAST(ESTE AS CHAR), 
	CAST(OESTE AS CHAR) 
	FROM TEMP T
) T1
WHERE frontera = null;

    
    









