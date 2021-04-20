"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./server/server"));
var evento_router_1 = __importDefault(require("./router/evento.router"));
var whatsapp_router_1 = __importDefault(require("./router/whatsapp.router"));
var usuario_routes_1 = __importDefault(require("./router/usuario.routes"));
var usuario_temperatura_routes_1 = __importDefault(require("./router/usuario_temperatura.routes"));
var usuario_frecuencia_routes_1 = __importDefault(require("./router/usuario_frecuencia.routes"));
var usuario_velocidad_routes_1 = __importDefault(require("./router/usuario_velocidad.routes"));
var usuario_vueltas_routes_1 = __importDefault(require("./router/usuario_vueltas.routes"));
var usuario_tiempo_routes_1 = __importDefault(require("./router/usuario_tiempo.routes"));
var usuario_distancia_routes_1 = __importDefault(require("./router/usuario_distancia.routes"));
var usuario_oxigeno_routes_1 = __importDefault(require("./router/usuario_oxigeno.routes"));
var espirometro_routes_1 = __importDefault(require("./router/espirometro.routes"));
var usuario_entrenamiento_routes_1 = __importDefault(require("./router/usuario_entrenamiento.routes"));
var coach_routes_1 = __importDefault(require("./router/coach.routes"));
var bodyParser = require("body-parser");
/**
 * CONFIGURACIÓN DE PUERTO LOCAL Y PRODUCCIÓN
 */
var PORT = parseInt(process.env.PORT, 10) || 3000;
var server = server_1.default.init(PORT);
var api = "/";
/**
 * HEADEARS & CORS
 */
server.app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    if (req.methods == "OPTIONS") {
        res.sendStatus(200);
    }
    else {
        next();
    }
});
/**
 * BODY PARSER
 */
server.app.use(bodyParser.json());
server.app.use(bodyParser.urlencoded({ extended: false }));
/**
 * API'S
 */
server.app.use(api, espirometro_routes_1.default);
server.app.use(api, evento_router_1.default);
server.app.use(api, whatsapp_router_1.default);
server.app.use(api, usuario_routes_1.default);
server.app.use(api, usuario_temperatura_routes_1.default);
server.app.use(api, usuario_frecuencia_routes_1.default);
server.app.use(api, usuario_oxigeno_routes_1.default);
server.app.use(api, coach_routes_1.default);
server.app.use(api, usuario_velocidad_routes_1.default);
server.app.use(api, usuario_tiempo_routes_1.default);
server.app.use(api, usuario_distancia_routes_1.default);
server.app.use(api, usuario_vueltas_routes_1.default);
server.app.use(api, usuario_entrenamiento_routes_1.default);
server.startSocket(function () {
    console.log("Servidor corriendo en el puerto 3000 :D");
});
