var socket = io();
        
        socket.on('connect', function () {
            console.log("Conectado al servidor :D");
        });

        socket.on('disconnect', function () {
            console.log("Se perdio la conexion D:");
        });

        //ENVIAR INFO
        socket.emit('enviarMensaje', {
            nombre: "Hola",
            id: "ABC"
        }, function (res) {
            console.log(res)
        });

        //ESCUCHAR
        socket.on('enviarMensaje', function (data) {
            console.log(data);
        });
        socket.on('refreshTemperatura', function (data) {
            console.log(data);
        });
        socket.on('refreshOxigeno', function (data) {
            console.log(data);
        });
        socket.on('refreshFrecuencia', function (data) {
            console.log(data);
        });