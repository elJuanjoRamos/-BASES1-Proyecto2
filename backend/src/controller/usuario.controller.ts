import { Request, Response } from 'express';
import MySQL from "./../mysql/mysql";
import SocketServer from "../socket/socket";

export default class UsuarioController {
    private static _instance: UsuarioController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getAll = (req: Request, res: Response) => {

        var query = "SELECT USUARIO.id, nombres, apellidos, edad,sexo, peso, estatura, tipo.nombre as tipo_usuario FROM USUARIO " +
                " JOIN TIPO_USUARIO as tipo ON USUARIO.TIPO = tipo.id"


        MySQL.getQuery(query, (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                SocketServer.getInstance().send();
                res.json(data)
            }
        })
    }

    getSingle = (req: Request, res: Response) => {
        
        var query = "SELECT USUARIO.id, nombres, apellidos, edad,sexo, peso, estatura, tipo.nombre as tipo_usuario FROM USUARIO " +
        " JOIN TIPO_USUARIO as tipo ON USUARIO.TIPO = tipo.id WHERE USUARIO.id = ?"

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
                res.json(data[0])
            }
        })
    }

    create = (req: Request, res: Response) => {
        var query = " CALL Crear_Usuario(?, ?, ?, ?, ?, ?, ?,?,?); ";
        var body = {
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            username: req.body.username,
            pass: req.body.pass,
            edad: req.body.edad,
            sexo: req.body.sexo,
            peso: req.body.peso,
            estatura: req.body.estatura,
            tipo: req.body.tipo
        };
        
        MySQL.sendQuery(query, 
            [body.nombres, body.apellidos, body.username, body.pass, body.edad, body.sexo, body.peso, body.estatura, body.tipo],
            (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json({
                    ok: true,
                    status: 200
                })
            }
        })
    }

    update = (req: Request, res: Response) => {
        var query = " CALL Crear_Usuario(?, ?, ?, ?, ?, ?, ?,?,?); ";
        var body = {
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            username: req.body.username,
            pass: req.body.pass,
            edad: req.body.edad,
            sexo: req.body.sexo,
            peso: req.body.peso,
            estatura: req.body.estatura,
            tipo: req.body.tipo
        };
    
        MySQL.sendQuery(query, 
            [body.nombres, body.apellidos, body.username, body.pass, body.edad, body.sexo, body.peso, body.estatura, body.tipo],
            (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json({
                    ok: true,
                    status: 200
                })
            }
        })
    }

    delete = (req: Request, res: Response) => {
        const id = req.params.id;

        const query = `DELETE FROM USUARIO WHERE id = ?`;

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


    auth = (req: Request, res: Response) => {
        var query = "SELECT USUARIO.id, nombres, apellidos, edad,sexo, peso, estatura, tipo.nombre as tipo_usuario FROM USUARIO " +
            " JOIN TIPO_USUARIO as tipo ON USUARIO.TIPO = tipo.id" +
            " WHERE username = ? AND pass = ?"

        var body = {
            username: req.body.username,
            pass: req.body.pass
        };
        MySQL.sendQuery(query, [body.username, body.pass], (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json(data[0])
            }
        })
    }
}