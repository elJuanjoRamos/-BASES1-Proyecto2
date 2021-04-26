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
        var query = "select Pais.id, Pais.nombre, Pais.poblacion, Pais.area, Pais.capital, R.nombre as region from pais " +
        "JOIN Region R on pais.region = R.id "+
        "ORDER BY Pais.nombre ASC;";
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
    getRegion = (req: Request, res: Response) => {
        var query = "SELECT * FROM Region";
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