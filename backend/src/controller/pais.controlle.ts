import { Request, Response } from 'express';
import MySQL from "./../mysql/mysql";

export default class PaisController {
    private static _instance: PaisController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getAll = (req: Request, res: Response) => {
        var query = "SELECT * FROM Pais";
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
    getPais = (req: Request, res: Response) => {
        var id = req.params.id;
        var query = "SELECT * FROM Pais WHERE id = ?" ;
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
}