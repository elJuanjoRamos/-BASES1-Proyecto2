import express = require('express');
import socketIO = require('socket.io');
import path = require('path');
import http = require('http');
import SocketServer from "../socket/socket";
import MySQL from "../mysql/mysql";

export default class Server {
    public app: express.Application;
    public port: number;
    public serverSocket:any;

    constructor(port:number) {
        this.port = port;
        this.app = express();
        this.serverSocket = http.createServer(this.app);
    }

    static init(port:number) {
        return new Server(port);
    }

    private publicFolder() {
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use( express.static(publicPath));
    }

    start(callback: any) {
        this.app.listen(this.port, callback);
        this.publicFolder();
    }

    /**
     * SOCKET.IO
     */
    startSocket(callback: any) {
        let io = socketIO(this.serverSocket);
        
        /**
         * INSTANCIA DE SOCKETS
         */
        SocketServer.getInstance().listenServer(io);
        
        /**
         * INSTANCIA DE MYSQL
         */
        MySQL.getInstance();

        this.serverSocket.listen(this.port, callback);
        this.publicFolder();
    }

}