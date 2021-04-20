import { Router } from "express";
import EventoController from "./../controller/evento.controller"
const evento = Router();

evento.get('/evento', EventoController.getInstance().getAll);
evento.get('/evento/:id', EventoController.getInstance().getSingle);
evento.post('/evento', EventoController.getInstance().create);
evento.put('/evento/:id', EventoController.getInstance().update);
evento.delete('/evento/:id', EventoController.getInstance().delete);

export default evento;