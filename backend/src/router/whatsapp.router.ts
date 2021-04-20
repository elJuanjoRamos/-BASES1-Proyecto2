import { Router } from "express";
import WhatsAppController from "./../controller/whatsapp.controller"
const evento = Router();

evento.get('/whatsapp', WhatsAppController.getInstance().getAll);
evento.post('/whatsapp', WhatsAppController.getInstance().create);

export default evento;