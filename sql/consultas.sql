USE Proyecto2;
/*CONSULTA 1*/
SELECT profesional, P.nombre AS NOMBRE_PROFESIONAL, COUNT(*) as inventos_asignados FROM Asignacion_Invento AI
JOIN Profesional P on P.id = AI.profesional
GROUP BY profesional
ORDER BY inventos_asignados desc



