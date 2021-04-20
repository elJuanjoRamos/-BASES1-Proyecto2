import { Request, Response } from 'express';
import SocketServer from '../socket/socket';
import MySQL from "./../mysql/mysql";

export default class UsuarioOxigenoController {
    private static _instance: UsuarioOxigenoController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || (this._instance = new this());
    }

    getAll = (req: Request, res: Response) => {
        var query = " SELECT USUARIO_OXIGENO.id, u.nombres, u.apellidos, u.peso, u.sexo, u.estatura, t.nombre as tipo,  oxigeno, fecha FROM USUARIO_OXIGENO " +
            "JOIN USUARIO as u on u.id = USUARIO_OXIGENO.atleta " +
            "JOIN TIPO_USUARIO as t ON u.tipo = t.id WHERE atleta = ? ";
        let body = {
            id: req.params.id
        }
        MySQL.sendQuery(query, [body.id], (err: any, data: Object[][]) => {
            console.log(err)
            if (err) {
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
        var query = " CALL SP_USUARIO_OXI(?, ?); ";
        var body = {
            atleta: req.body.atleta,
            oxigeno: req.body.oxigeno
        };
        MySQL.sendQuery(query,
            [body.atleta, body.oxigeno],
            (err: any, data: Object[]) => {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                } else {
                    query = 'SELECT * FROM USUARIO_OXIGENO WHERE atleta =? ORDER BY fecha DESC LIMIT 10;'

                    MySQL.sendQuery(query, [body.atleta], (err: any, data: Object[][]) => {
                        console.log(err)
                        if (err) {
                            res.status(400).json({
                                ok: false,
                                status: 400,
                                error: err
                            });
                        } else {
                            console.log(data)
                            SocketServer.getInstance().sendOxigeno(body.atleta, data);
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
        var query = " DELETE FROM USUARIO_OXIGENO WHERE id = ?; ";
        var id = req.params.id
        MySQL.sendQuery(query, id, (err: any, data: Object[]) => {
            if (err) {
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