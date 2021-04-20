import { Request, Response } from 'express';
import MySQL from "../mysql/mysql";
import SocketServer from "../socket/socket";

export default class EntrenamientoController {
    private static _instance: EntrenamientoController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getAll = (req: Request, res: Response) => {
        var query = " SELECT * FROM ENTRENAMIENTO where atleta = ?" ;

        let body = {
            id : req.params.id
        }
        MySQL.sendQuery(query, [body.id], (err:any, data:Object[][]) => {
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
    getAllDetalle = (req: Request, res: Response) => {
        var query = " SELECT * FROM ENTRENAMIENTO_DETALLE where idEntrenamiento = ?" ;

        let body = {
            id : req.params.id
        }
        MySQL.sendQuery(query, [body.id], (err:any, data:Object[][]) => {
            console.log(err)
            if(err) {
                console.log(err);
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

    create = (req: Request, res: Response) => {
        var query = " CALL Crear_Entrenamiento(?, ?); ";
        var body = {
            atleta: req.body.atleta,
            nombre: req.body.nombre
        };
    
        MySQL.sendQuery(query, 
            [body.atleta, body.nombre],
            (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });



            } else {
                var datos :any = data[0];

                res.json({
                    ok: true,
                    status: 200,
                    idEntrenamiento: datos[0].id,
                    nombre: datos[0].nombre,
                    atleta: datos[0].atleta,
                    fecha: datos[0].fecha
                });
            }
        });
    }

    
    createDetalle = (req: Request, res: Response) => {
        var query = " CALL SP_ENTRENAMIENTO_DETALLE(?, ?, ?, ?, ?); ";
        var body = {
            entrenamiento: req.body.entrenamiento,
            velocidad: req.body.velocidad,
            distancia: req.body.distancia,
            tiempo: req.body.tiempo,
            vueltas: req.body.vueltas
        };
    
        MySQL.sendQuery(query, 
            [body.entrenamiento, body.velocidad, body.distancia, body.tiempo, body.vueltas],
            (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });



            } else {
                query = 'SELECT * FROM ENTRENAMIENTO_DETALLE where identrenamiento = ? ORDER BY fecha DESC LIMIT 10;'

                MySQL.sendQuery(query, [body.entrenamiento], (err:any, data:Object[][]) => {
                    console.log(err)
                    if(err) {
                        res.status(400).json({
                            ok: false,
                            status: 400,
                            error: err
                        });
                    } else {
                        SocketServer.getInstance().sendDetalleEntrenamiento(body.entrenamiento, data);
                    }
                });
                res.json({
                    ok: true,
                    status: 200,
                    data: data
                })
            }
        });
    }


    delete = (req: Request, res: Response) => {
        var query = " DELETE FROM Entrenamiento WHERE id = ?; ";
        var id = req.params.id

        MySQL.sendQuery(query, id, (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json({
                    ok: true,
                    status: 200,
                })
            }
        })
    }
}