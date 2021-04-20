"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var socketIO = require("socket.io");
var path = require("path");
var http = require("http");
var socket_1 = __importDefault(require("../socket/socket"));
var mysql_1 = __importDefault(require("../mysql/mysql"));
var Server = /** @class */ (function () {
    function Server(port) {
        this.port = port;
        this.app = express();
        this.serverSocket = http.createServer(this.app);
    }
    Server.init = function (port) {
        return new Server(port);
    };
    Server.prototype.publicFolder = function () {
        var publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
    };
    Server.prototype.start = function (callback) {
        this.app.listen(this.port, callback);
        this.publicFolder();
    };
    /**
     * SOCKET.IO
     */
    Server.prototype.startSocket = function (callback) {
        var io = socketIO(this.serverSocket);
        /**
         * INSTANCIA DE SOCKETS
         */
        socket_1.default.getInstance().listenServer(io);
        /**
         * INSTANCIA DE MYSQL
         */
        mysql_1.default.getInstance();
        this.serverSocket.listen(this.port, callback);
        this.publicFolder();
    };
    return Server;
}());
exports.default = Server;
