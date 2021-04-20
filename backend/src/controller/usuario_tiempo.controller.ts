import { Request, Response } from 'express';
import MySQL from "../mysql/mysql";
import SocketServer from "../socket/socket";

export default class UsuarioTiempoController {
    private static _instance: UsuarioTiempoController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getAll = (req: Request, res: Response) => {
        var query = " SELECT USUARIO_TIEMPO.id as tiempo_id, u.nombres, u.apellidos, u.peso, u.sexo, u.estatura, t.nombre as tipo,  tiempo, fecha FROM USUARIO_TIEMPO " +
                "JOIN USUARIO as u on u.id = USUARIO_TIEMPO.atleta " +
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
        var query = " CALL SP_USUARIO_TIME(?, ?); ";
        var body = {
            atleta: req.body.atleta,
            tiempo: req.body.tiempo
        };
    
        MySQL.sendQuery(query, 
            [body.atleta, body.tiempo],
            (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });



            } else {
                query = 'SELECT * FROM USUARIO_TIEMPO WHERE atleta =? ORDER BY fecha DESC LIMIT 10;'

                MySQL.sendQuery(query, [body.atleta], (err:any, data:Object[][]) => {
                    console.log(err)
                    if(err) {
                        res.status(400).json({
                            ok: false,
                            status: 400,
                            error: err
                        });
                    } else {
                        SocketServer.getInstance().sendTiempo(body.atleta, data);
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
        var query = " DELETE FROM USUARIO_TIEMPO WHERE id = ?; ";
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