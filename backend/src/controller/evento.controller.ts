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
        const query = `
            CALL GetAllEVENTOS();
        `;

        MySQL.getQuery(query, (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                SocketServer.getInstance().send();
                res.json(data[0])
            }
        })
    }

    getSingle = (req: Request, res: Response) => {
        const query = `
            CALL GetEVENTOS(?);
        `;

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
                console.log(data)
                res.json(data[0][0])
            }
        })
    }

    create = (req: Request, res: Response) => {
        const query = `
            CALL NewEVENTOS(?,?,?,?,?,?,?);
        `;
        let body = {
            eve_titulo: req.body.eve_titulo,
            eve_descripcion: req.body.eve_descripcion,
            eve_img: req.body.eve_img,
            eve_tipos_id: req.body.eve_tipos_id,
            eve_estado: req.body.eve_estado,
            eve_fecha_hora: req.body.eve_fecha_hora,
            eve_cat_id: req.body.eve_cat_id,
        }
        
        MySQL.sendQuery(query, 
            [body.eve_titulo, body.eve_descripcion, body.eve_img, body.eve_tipos_id, body.eve_estado, body.eve_fecha_hora, body.eve_cat_id], 
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
        let body = {
            eve_titulo: req.body.eve_titulo,
            eve_descripcion: req.body.eve_descripcion,
            eve_img: req.body.eve_img,
            eve_tipos_id: req.body.eve_tipos_id,
            eve_estado: req.body.eve_estado,
            eve_fecha_hora: req.body.eve_fecha_hora,
            eve_cat_id: req.body.eve_cat_id,
            eve_id: req.params.id
        }
    
        const query = `
            CALL UpdateEVENTOS(?,?,?,?,?,?,?,?);
        `;
    
        MySQL.sendQuery(query, 
            [body.eve_id, body.eve_titulo, body.eve_descripcion, body.eve_img, body.eve_tipos_id, body.eve_estado, body.eve_fecha_hora, body.eve_cat_id],
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

        const query = `
            CALL DeleteEVENTOS(?)
        `;

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