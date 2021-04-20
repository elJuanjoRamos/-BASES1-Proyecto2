import Server from "./server/server";
import evento from "./router/evento.router";
import whatsapp from "./router/whatsapp.router";
import usuario from "./router/usuario.routes";
import temperatura from "./router/usuario_temperatura.routes" 
import frecuencia from "./router/usuario_frecuencia.routes" 
import velocidad from "./router/usuario_velocidad.routes" 
import vuelta from "./router/usuario_vueltas.routes" 
import tiempo from "./router/usuario_tiempo.routes" 
import distancia from "./router/usuario_distancia.routes" 
import oxigeno from "./router/usuario_oxigeno.routes" 
import espirometro from "./router/espirometro.routes";
import entrenamiento from "./router/usuario_entrenamiento.routes" 
import coach from "./router/coach.routes" 

import bodyParser = require('body-parser');

/**
 * CONFIGURACIÓN DE PUERTO LOCAL Y PRODUCCIÓN
 */
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;
const server = Server.init(PORT);
const api:string = "/"

/**
 * HEADEARS & CORS
 */
server.app.use((req:any, res:any, next:any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');  
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  if(req.methods == "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

/**
 * BODY PARSER
 */
server.app.use(bodyParser.json())
server.app.use(bodyParser.urlencoded({ extended: false }))

/**
 * API'S
 */
server.app.use(api, espirometro);
server.app.use(api, evento);
server.app.use(api, whatsapp);
server.app.use(api, usuario);
server.app.use(api, temperatura);
server.app.use(api, frecuencia);
server.app.use(api, oxigeno);
server.app.use(api, coach);
server.app.use(api, velocidad);
server.app.use(api, tiempo);
server.app.use(api, distancia);
server.app.use(api, vuelta);
server.app.use(api, entrenamiento);


server.startSocket(()=> {
  console.log("Servidor corriendo en el puerto 3000 :D")
});



