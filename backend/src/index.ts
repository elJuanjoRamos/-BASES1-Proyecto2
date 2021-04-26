import Server from "./server/server";
import consulta from "./router/consulta.routes";
import pais from "./router/pais.routes";
import question from "./router/question.routes";

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
server.app.use(api, consulta);
server.app.use(api, pais);
server.app.use(api, question);


server.start(()=> {
  console.log("Servidor corriendo en el puerto 3000 :D")
});



