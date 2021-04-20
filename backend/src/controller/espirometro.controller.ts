import { Request, Response } from 'express';
import MySQL from "../mysql/mysql";
import SocketServer from "../socket/socket";

export default class EspirometroController {
    private static _instance: EspirometroController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getAll = (req: Request, res: Response) => {
        var query = " SELECT * FROM USUARIO_ASPIROMETRO where usuario = ?" ;

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
    getAllDetalle = (req: Request, res: Response) => {
        var query = " SELECT * FROM DETALLE_ASPIROMETRO where sesion = ?" ;

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
        var query = " CALL Crear_Sesion(?, ?); ";
        var body = {
            usuario: req.body.usuario,
            titulo: req.body.titulo
        };
    
        MySQL.sendQuery(query, 
            [body.usuario, body.titulo],
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
                    idSesion: datos[0].id,
                    usuario: datos[0].usuario,
                    titulo: datos[0].titulo,
                    fecha: datos[0].fecha
                });
            }
        });
    }

    
    createDetalle = (req: Request, res: Response) => {
        var query = " CALL SP_ASPIROMETRO_DETALLE(?, ?); ";
        var body = {
            sesion: req.body.sesion,
            volumen: req.body.volumen
        };
    
        MySQL.sendQuery(query, 
            [body.sesion, body.volumen],
            (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                query = 'select ' + 
                '(select max(volumen) from DETALLE_ASPIROMETRO where volumen > 0 and sesion = ' + body.sesion + ') as maximo_inhalado, ' +
                '(select min(volumen) from DETALLE_ASPIROMETRO where volumen > 0 and sesion = ' + body.sesion + ') as minimo_inhalado, ' +
                '(select max(volumen) from DETALLE_ASPIROMETRO where volumen < 0 and sesion = ' + body.sesion + ') as maximo_exhalado, ' +
                '(select min(volumen) from DETALLE_ASPIROMETRO where volumen < 0 and sesion = ' + body.sesion + ') as minimo_exhalado, ' +
                '(select avg(volumen) from DETALLE_ASPIROMETRO where volumen > 0 and sesion = ' + body.sesion + ') as promed_inhalado, ' +
                '(select avg(volumen) from DETALLE_ASPIROMETRO where volumen < 0 and sesion = ' + body.sesion + ') as promed_exhalado, ' +
                '(select sum(volumen) from DETALLE_ASPIROMETRO where volumen < 0 and sesion = ' + body.sesion + ') as vo2_exhalado, ' +
                '(select sum(volumen) from DETALLE_ASPIROMETRO where volumen > 0 and sesion = ' + body.sesion + ') as vo2_inhalado ' + 
                'from DETALLE_ASPIROMETRO where sesion = '+ body.sesion+ '  limit 1;';

                console.log(query)
                MySQL.sendQuery(query, [], (err:any, data:Object[][]) => { 
                    if(err) {
                        res.status(400).json({
                            ok: false,
                            status: 400,
                            error: err
                        });
                    } else {

                        SocketServer.getInstance().sendDetalleEspirometro(body.sesion, data[0]);
                        res.json({
                            ok: true,
                            status: 200,
                            data : data[0]
                        })
                    }
                });
                
            }
        });
    }
   
}