"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SocketServer = /** @class */ (function () {
    function SocketServer() {
    }
    SocketServer.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    SocketServer.prototype.listenServer = function (socket) {
        this.io = socket;
        this.io.on('connection', function (client) {
            console.log("Usuario conectado :D");
            client.emit('enviarMensaje', {
                usuario: 'Administrador',
                mensaje: 'Bienvenido a la aplicación'
            });
            client.on('disconnect', function () {
                console.log("Cliente desconectado D:");
            });
            //LISTEN CLIENT
            client.on('enviarMensaje', function (data, callback) {
                console.log(data);
                client.broadcast.emit('enviarMensaje', data);
            });
            client.on('refreshTemperatura', function (data, callback) {
                client.broadcast.emit('refreshTemperatura', data);
            });
            client.on('refreshOxigeno', function (data, callback) {
                client.broadcast.emit('refreshOxigeno', data);
            });
            client.on('refreshFrecuencia', function (data, callback) {
                client.broadcast.emit('refreshFrecuencia', data);
            });
            client.on('refreshVelocidad', function (data, callback) {
                client.broadcast.emit('refreshVelocidad', data);
            });
            client.on('refreshTiempo', function (data, callback) {
                client.broadcast.emit('refreshTiempo', data);
            });
            client.on('refreshDistancia', function (data, callback) {
                client.broadcast.emit('refreshDistancia', data);
            });
            client.on('refreshVuelta', function (data, callback) {
                client.broadcast.emit('refreshVuelta', data);
            });
            client.on('refreshDetalle', function (data, callback) {
                client.broadcast.emit('refreshDetalle', data);
            });
            client.on('refreshDetalleEspirometro', function (data, callback) {
                client.broadcast.emit('refreshDetalleEspirometro', data);
            });
            //
        });
    };
    SocketServer.prototype.send = function () {
        this.io.emit('enviarMensaje', {
            saludar: 'Hola a BRODCAST'
        });
    };
    SocketServer.prototype.sendTemperatura = function (id_usuario, data) {
        console.log(data);
        this.io.emit('refreshTemperatura', {
            satus: 200,
            ok: true,
            idUsuario: id_usuario,
            temperaturas: data
        });
    };
    SocketServer.prototype.sendOxigeno = function (id_usuario, data) {
        console.log(data);
        this.io.emit('refreshOxigeno', {
            satus: 200,
            ok: true,
            idUsuario: id_usuario,
            oxigenos: data
        });
    };
    SocketServer.prototype.sendFrecuencia = function (id_usuario, data) {
        console.log(data);
        this.io.emit('refreshFrecuencia', {
            satus: 200,
            ok: true,
            idUsuario: id_usuario,
            frecuencias: data
        });
    };
    SocketServer.prototype.sendVelocidad = function (id_usuario, data) {
        console.log(data);
        this.io.emit('refreshVelocidad', {
            satus: 200,
            ok: true,
            idUsuario: id_usuario,
            velocidad: data
        });
    };
    SocketServer.prototype.sendTiempo = function (id_usuario, data) {
        console.log(data);
        this.io.emit('refreshTiempo', {
            satus: 200,
            ok: true,
            idUsuario: id_usuario,
            tiempo: data
        });
    };
    SocketServer.prototype.sendDistancia = function (id_usuario, data) {
        console.log(data);
        this.io.emit('refreshDistancia', {
            satus: 200,
            ok: true,
            idUsuario: id_usuario,
            distancia: data
        });
    };
    SocketServer.prototype.sendVuelta = function (id_usuario, data) {
        console.log(data);
        this.io.emit('refreshVuelta', {
            satus: 200,
            ok: true,
            idUsuario: id_usuario,
            vuelta: data
        });
    };
    SocketServer.prototype.sendDetalleEntrenamiento = function (id_entrenamiento, data) {
        console.log(data);
        this.io.emit('refreshDetalle', {
            satus: 200,
            ok: true,
            idEntrenamiento: id_entrenamiento,
            detalle: data
        });
    };
    SocketServer.prototype.sendDetalleEspirometro = function (id_sesion, data) {
        console.log(data);
        this.io.emit('refreshDetalleEspirometro', {
            satus: 200,
            ok: true,
            idSesion: id_sesion,
            detalle: data
        });
    };
    return SocketServer;
}());
exports.default = SocketServer;
