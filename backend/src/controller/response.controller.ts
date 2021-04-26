import { Request, Response } from 'express';
import MySQL from "./../mysql/mysql";

export default class ResponceController {
    private static _instance: ResponceController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getAll = (req: Request, res: Response) => {
        var query = 
        "select RC.id, RC.respuesta, RC.idRespuesta, P.id as idPregunta, P.pregunta from Respuesta_correcta RC "+
        "JOIN Pregunta P on P.id = RC.pregunta";
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
    getAnswer = (req: Request, res: Response) => {
        var id = req.params.id;
        var query = 
        "SELECT id, respuesta FROM Respuesta WHERE pregunta = ?";
        MySQL.sendQuery(query, [id], (err:any, data:Object[]) => {
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
    getQuestion = (req: Request, res: Response) => {
        var query = 
            "SELECT P.id, P.pregunta, E.nombre as encuesta FROM Pregunta P "+
            "JOIN Encuesta E on E.id = P.encuensta;";
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
       
    
    updateAnswer = (req: Request, res: Response) => {

        var id = req.params.id;
        const { answer } = req.body;  

        var query = "UPDATE Respuesta_Correcta SET idRespuesta =?, respuesta =(SELECT respuesta FROM Respuesta where id = ?) WHERE id = ?";

        console.log(req.body);
        MySQL.sendQuery(query, [answer, answer, id], (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json(data)
            }
        });           
    }
    
}