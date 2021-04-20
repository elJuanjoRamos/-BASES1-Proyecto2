import { Request, Response } from 'express';
import MySQL from "../mysql/mysql";
import SocketServer from "../socket/socket";

export default class UsuarioDistanciaController {
    private static _instance: UsuarioDistanciaController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getAll = (req: Request, res: Response) => {
        var query = " SELECT USUARIO_DISTANCIA.id as distancia_id, u.nombres, u.apellidos, u.peso, u.sexo, u.estatura, t.nombre as tipo,  distancia, fecha FROM USUARIO_DISTANCIA " +
                "JOIN USUARIO as u on u.id = USUARIO_DISTANCIA.atleta " +
                "JOIN TIPO_USUARIO as t ON u.tipo = t.id WHERE atleta = ? ";

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
        var query = " CALL SP_USUARIO_DIST(?, ?); ";
        var body = {
            atleta: req.body.atleta,
            distancia: req.body.distancia
        };
    
        MySQL.sendQuery(query, 
            [body.atleta, body.distancia],
            (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });



            } else {
                query = 'SELECT * FROM USUARIO_DISTANCIA WHERE atleta =? ORDER BY fecha DESC LIMIT 10;'

                MySQL.sendQuery(query, [body.atleta], (err:any, data:Object[][]) => {
                    console.log(err)
                    if(err) {
                        res.status(400).json({
                            ok: false,
                            status: 400,
                            error: err
                        });
                    } else {
                        SocketServer.getInstance().sendDistancia(body.atleta, data);
                    }
                });
                res.json({
                    ok: true,
                    status: 200
                })
            }
        })
    }

    

    delete = (req: Request, res: Response) => {
        var query = " DELETE FROM USUARIO_DISTANCIA WHERE id = ?; ";
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