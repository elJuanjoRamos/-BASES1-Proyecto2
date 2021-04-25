import { Request, Response } from 'express';
import MySQL from "./../mysql/mysql";

export default class ConsultaController {
    private static _instance: ConsultaController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    query = (req: Request, res: Response) => {
        var id = req.params.id;
        console.log(id);
        var query = "";
        switch(Number(id)) {
            case 1:
                query = 
                "SELECT profesional, P.nombre AS NOMBRE_PROFESIONAL, COUNT(*) as inventos_asignados FROM Asignacion_Invento AI " +
                "JOIN Profesional P on P.id = AI.profesional " +
                "GROUP BY profesional " +
                "ORDER BY inventos_asignados desc; ";
            case 2:
                query =
                "SELECT PR.pais as idPais, P.nombre, COUNT(*) as total_respuestas FROM Pais_Respuesta PR "+
                "JOIN PAIS P on P.id = PR.pais " +
                "GROUP BY PR.pais "+
                "ORDER BY PR.pais  ASC;";
            case 3:
                query = 
                "SELECT id, nombre FROM PAIS "+
                "WHERE id not in(SELECT DISTINCT PAIS FROM Inventor) "+
                "AND "+
                "id in(SELECT DISTINCT pais FROM FRONTERA where front is null) "+
                "order by nombre asc;";
            case 4:
                query =
                "select PA.area as idAarea, A.nombre as area, P.nombre as Jefe_Area, P1.nombre as Subordinado  from Profe_Area PA "+
                "JOIN Area A on PA.area = A.id "+
                "JOIN Jefe_Area JA on JA.area = A.id "+
                "JOIN Profesional P on JA.profesional = P.id "+
                "JOIN Profesional P1 on PA.profesional = P1.id "+
                "ORDER BY Jefe_Area ASC;";
            case 5:
                query =
                "SELECT P1.nombre, PA.area,  P1.salario FROM Profe_Area PA "+
                "JOIN Profesional P1 on PA.profesional = P1.id "+
                "WHERE P1.salario > (SELECT prom_salario FROM C52 WHERE area = PA.area) "+
                "ORDER BY area asc;";
            case 6:
                query =
                "SELECT P.nombre,  COUNT(*) AS TOTAL_ACIERTOS FROM Pais_Respuesta PR "+
                "JOIN Pais P on PR.pais = P.id "+
                "JOIN Pregunta P1 on PR.pregunta = P1.id "+
                "JOIN Respuesta_correcta RC on RC.pregunta = PR.pregunta "+
                "WHERE TRIM(SUBSTR(RC.respuesta, 1,1)) = letra "+
                "group by P.nombre ORDER BY TOTAL_ACIERTOS DESC; ";
            case 7:
                query =
                "SELECT P.nombre as Investigador, AI.invento as idInvento, I.nombre as invento, I.anio FROM Asignacion_Invento AI "+
                "JOIN Invento I on I.id = AI.invento "+
                "JOIN Profesional P on P.id = AI.profesional "+
                "JOIN Profe_Area PA on P.id = PA.profesional "+
                "JOIN Area A on PA.area = A.id "+
                "WHERE A.nombre = 'optica'; ";
            case 8:
                query =
                "select SUBSTR(nombre, 1,1) AS inicial_pais, sum(area) AS total_area  FROM Pais "+
                "group by SUBSTR(nombre, 1,1) "+
                "order by inicial_muicipio asc; ";
            case 9:
                query =
                "SELECT IR.nombre as Inventor, I.nombre as Invento, I.anio as Anio_Invento, P.nombre as Pais_Invento FROM Inventor_Invento II "+
                "JOIN Invento I on I.id = II.idinvento "+
                "JOIN Inventor IR on IR.id = II.idInventor "+
                "JOIN Pais P on P.id = IR.pais "+
                "WHERE SUBSTR(IR.nombre, 1,2) = 'Be';";
            case 10:
                query =
                "SELECT IR.nombre as Inventor, I.nombre as Invento, I.anio as Anio_Invento, P.nombre as Pais_Invento FROM Inventor_Invento II "+
                "JOIN Invento I on I.id = II.idinvento "+
                "JOIN Inventor IR on IR.id = II.idInventor "+
                "JOIN Pais P on P.id = IR.pais "+
                "WHERE SUBSTR(IR.nombre, 1,1) = 'B' "+
                "AND (RIGHT(IR.nombre, 1) = 'r' "+
                "OR RIGHT(IR.nombre, 1) = 'n') "+
                "AND (1801 <= I.anio AND I.anio <= 1900);";
            case 11:
                query =
                "SELECT * FROM (SELECT pais, P.nombre as nombre, P.area as area, count(*) as cant_fronteras FROM Frontera "+
                "JOIN Pais P on P.id = pais "+
                "GROUP BY pais) T "+
                "WHERE T.cant_fronteras >= 7 "+
                "ORDER BY area desc;";
            case 12:
                query =
                "SELECT Invento.id, Invento.nombre, anio, P.nombre FROM Invento "+
                "JOIN Pais P on P.id = Invento.pais "+
                "WHERE SUBSTR(Invento.nombre, 1,1) = 'L';";
            case 13:
                query =
                "SELECT id, nombre, salario, contrato, comision, (salario+comision) as total_Salario FROM Profesional "+
                "WHERE Comision != \"\" "+
                "AND 0.25*salario < TRUNCATE(CAST(comision AS DECIMAL(6,2)),0);";
            case 14:
                query = 
                "SELECT encuesta as id, E.nombre as Nombre_Encuesta, COUNT(pais) as total_paises FROM Pais_Respuesta "+
                "JOIN Encuesta E on E.id = Pais_Respuesta.encuesta "+
                "GROUP BY encuesta "+
                "ORDER BY total_paises DESC;";
            case 15:
                query =
                "SELECT P.id, P.nombre, P.poblacion, P.area, P.capital, R.nombre, C.nombre FROM Pais P "+
                "JOIN Region R on P.region = R.id "+
                "JOIN Continente C on R.idContinente = C.id "+
                "WHERE P.poblacion  > (SELECT sum(poblacion) as total_poblacion_ca FROM PAIS P1 "+
                "JOIN Region R on P1.region = R.id "+
                "where R.nombre = 'Centro America'); ";
            case 16:
                query = "select * from pais;";
            case 17:
                query = 
                "SELECT I.nombre as invento, INV.nombre as inventor FROM Inventor_Invento II "+
                "JOIN Invento I ON II.idInvento = I.id "+
                "JOIN Inventor INV ON II.idInventor = INV.id "+
                "WHERE I.anio = ( SELECT I.anio FROM Inventor_Invento II "+
                "JOIN Invento I ON II.idInvento = I.id "+
                "JOIN Inventor INV ON II.idInventor = INV.id "+
                "WHERE INV.nombre = 'BENZ'); ";
            case 18:
                query =
                "SELECT P.nombre, P.poblacion, P.area FROM Frontera F "+
                "JOIN Pais P on F.pais = P.id "+
                "WHERE F.front IS NULL "+
                "AND P.area >= (SELECT area FROM Pais WHERE nombre = 'Japon'); ";
            case 19:
                query =
                "SELECT P.nombre AS Pais, P1.nombre AS Frontera  FROM Frontera F "+
                "JOIN Pais P on F.pais = P.id "+
                "JOIN Pais P1 on F.front = P1.id "+
                "WHERE F.front IS NOT NULL; ";
            case 20:
                query =
                "SELECT id, nombre, salario, contrato, comision, (salario+comision) as total_Salario FROM Profesional "+
                "WHERE Comision != \"\""+
                "AND salario > 2*TRUNCATE(CAST(comision AS DECIMAL(6,2)),0);";
            default:
                query = 
                "SELECT profesional, P.nombre AS NOMBRE_PROFESIONAL, COUNT(*) as inventos_asignados FROM Asignacion_Invento AI " +
                "JOIN Profesional P on P.id = AI.profesional " +
                "GROUP BY profesional " +
                "ORDER BY inventos_asignados desc; ";
        }
        MySQL.sendQuery(query, [], (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
               
                res.json(data)
            }
        })       
    }    
}