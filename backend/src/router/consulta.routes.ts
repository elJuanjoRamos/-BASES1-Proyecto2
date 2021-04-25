import { Router } from "express";
import controller from "./../controller/consulta.controller"
const router = Router();

router.get('/consulta/:id', controller.getInstance().query);

export default router;