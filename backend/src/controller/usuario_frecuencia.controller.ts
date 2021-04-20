import { Request, Response } from 'express';
import SocketServer from '../socket/socket';
import MySQL from "./../mysql/mysql";

export default class UsuarioFrecuenciaController {
    private static _instance: UsuarioFrecuenciaController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getAll = (req: Request, res: Response) => {
        var query = " SELECT USUARIO_FRECUENCIA_CARDIACA.id, u.nombres, u.apellidos, u.peso, u.sexo, u.estatura, t.nombre as tipo,  frecuencia, fecha FROM USUARIO_FRECUENCIA_CARDIACA " +
                "JOIN USUARIO as u on u.id = USUARIO_FRECUENCIA_CARDIACA.atleta " +
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
        var query = " CALL SP_USUARIO_CARD(?, ?); ";
            var body = {
                atleta: req.body.atleta,
                frecuencia: req.body.frecuencia
            };
    
            if (body.frecuencia == 0) {
                body.frecuencia = 30;
            }

        MySQL.sendQuery(query, 
            [body.atleta, body.frecuencia],
            (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                query = 'SELECT * FROM USUARIO_FRECUENCIA_CARDIACA WHERE atleta =? ORDER BY fecha DESC LIMIT 10;'

                    MySQL.sendQuery(query, [body.atleta], (err: any, data: Object[][]) => {
                        console.log(err)
                        if (err) {
                            res.status(400).json({
                                ok: false,
                                status: 400,
                                error: err
                            });
                        } else {
                            SocketServer.getInstance().sendFrecuencia(body.atleta, data);
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
        var query = " DELETE FROM USUARIO_FRECUENCIA_CARDIACA WHERE id = ?; ";
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