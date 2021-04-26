"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./server/server"));
var consulta_routes_1 = __importDefault(require("./router/consulta.routes"));
var pais_routes_1 = __importDefault(require("./router/pais.routes"));
var question_routes_1 = __importDefault(require("./router/question.routes"));
var responce_routes_1 = __importDefault(require("./router/responce.routes"));
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
server.app.use(api, consulta_routes_1.default);
server.app.use(api, pais_routes_1.default);
server.app.use(api, question_routes_1.default);
server.app.use(api, responce_routes_1.default);
server.start(function () {
    console.log("Servidor corriendo en el puerto 3000 :D");
});
