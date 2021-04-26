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
        var query = "SELECT IR.id as idInventor, IR.nombre as Inventor, I.id as idInvento, I.nombre as Invento, I.anio as Anio_Invento, P.nombre as Pais_Invento FROM Inventor_Invento II " +
        "JOIN Invento I on I.id = II.idinvento "+
        "JOIN Inventor IR on IR.id = II.idInventor " +
        "JOIN Pais P on P.id = IR.pais; ";

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
    postPais = (req: Request, res: Response) => {

        console.log(req.body)

        const { country, poblation, area, capital, region } = req.body;  

        var query = "INSERT INTO Pais(nombre, poblacion, area, capital, region) "+
        " VALUES(?, ?, ?, ?, ?);";
        MySQL.sendQuery(query, [country, poblation, area, capital, region], (err:any, data:Object[]) => {
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
    deletePais = (req: Request, res: Response) => {

        var id = req.params.id;
        var query = "DELETE FROM Pais WHERE id = ?";
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
    updatePais = (req: Request, res: Response) => {

        var id = req.params.id;
        const { country, poblation, area, capital, region } = req.body;  

        console.log(req.body)

        var query = "UPDATE Pais SET nombre =?, poblacion =?, area =?, capital =?, region =? WHERE id = ?";
        MySQL.sendQuery(query, [country, poblation, area, capital, region, id], (err:any, data:Object[]) => {
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