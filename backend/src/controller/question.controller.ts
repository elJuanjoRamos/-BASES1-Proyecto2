import { Request, Response } from 'express';
import MySQL from "./../mysql/mysql";

export default class QuestionController {
    private static _instance: QuestionController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getEncuesta = (req: Request, res: Response) => {
        var query = "SELECT * FROM Encuesta ";
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
       
    postQuestion = (req: Request, res: Response) => {

        console.log(req.body)

        const { pregunta, encuesta } = req.body;  

        var query = "INSERT INTO Pregunta(pregunta, encuesta) "+
        " VALUES(?, ?);";
        MySQL.sendQuery(query, [pregunta, encuesta], (err:any, data:Object[]) => {
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
    deleteQuestion = (req: Request, res: Response) => {

        var id = req.params.id;
        var query = "DELETE FROM Pregunta WHERE id = ?";
        MySQL.sendQuery(query, [id], (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json({"mensaje" : "Eliminado"})
            }
        })    
        
    }
    updateQuestion = (req: Request, res: Response) => {

        var id = req.params.id;
        const { pregunta, encuesta } = req.body;  

        console.log(req.body)

        var query = "UPDATE Pregunta SET pregunta =?, encuesta =? WHERE id = ?";
        MySQL.sendQuery(query, [pregunta, encuesta, id], (err:any, data:Object[]) => {
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