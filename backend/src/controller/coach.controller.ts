import { Request, Response } from 'express';
import MySQL from "./../mysql/mysql";
import SocketServer from "../socket/socket";

export default class EventoController {
    private static _instance: EventoController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getAll = (req: Request, res: Response) => {
        var query = "SELECT U.nombres, U.apellidos, U.edad, U.sexo, U.peso, U.estatura, CU.id FROM COACH_USUARIO as CU " + 
        "JOIN USUARIO as U ON CU.atleta = U.id " +
        "WHERE CU.coach = ?";

        var id = req.params.id

        MySQL.sendQuery(query, [id], (err:any, data:Object[]) => {
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

        let body = {
            atleta : req.params.atleta,
            coach: req.params.coach
        }
        var query = "SELECT U.nombres, U.apellidos, U.edad, U.sexo, U.peso, U.estatura, CU.id FROM COACH_USUARIO as CU " + 
        "JOIN USUARIO as U ON CU.atleta = U.id " +
        "WHERE CU.coach = "  + body.coach + " AND CU.atleta = " + body.atleta;

        MySQL.getQuery(query, (err:any, data:Object[][]) => {
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
        var query = `CALL SP_USUARIO_COATCH(?,?);`;
        let body = {
            atleta: req.body.atleta,
            coach: req.body.coach
        }
        
        MySQL.sendQuery(query, 
            [body.atleta, body.coach], 
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
        var id = req.params.id;
        var query = `DELETE FROM COACH_USUARIO WHERE id =?`;

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