import { Request, Response } from 'express';
import MySQL from "./../mysql/mysql";

export default class InventorController {
    private static _instance: InventorController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getAll = (req: Request, res: Response) => {
        var query = "SELECT II.id as id, IR.id as idInventor, IR.nombre as Inventor, I.id as idInvento, I.nombre as Invento, I.anio as Anio_Invento, P.nombre as Pais_Invento FROM Inventor_Invento II " +
        "JOIN Invento I on I.id = II.idinvento "+
        "JOIN Inventor IR on IR.id = II.idInventor " +
        "JOIN Pais P on P.id = IR.pais " + 
        "ORDER BY II.id asc";

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
    getInventor = (req: Request, res: Response) => {
        var query = "SELECT * FROM Inventor";
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
    
    updateInvento = (req: Request, res: Response) => {

        var id_query = req.params.id;
        const { id, invento, nuevoInventor, nuevoNombre, nuevoAnio } = req.body;  
        console.log(id);
        console.log(req.body)



        var query = "UPDATE Inventor_Invento SET idInvento =?, idInventor =? WHERE id = ?";
        MySQL.sendQuery(query, [invento, nuevoInventor, id], (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {

                query = "UPDATE Invento SET nombre = ?, anio = ? WHERE id = ?";

                MySQL.sendQuery(query, [nuevoNombre, nuevoAnio, invento], (err:any, data:Object[]) => {
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
        });           
    }
}