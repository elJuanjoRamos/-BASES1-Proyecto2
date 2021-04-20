import { Router } from "express";
import controller from "../controller/usuario_distancia.controller"
const router = Router();

router.get('/distancia/usuario/:id', controller.getInstance().getAll);
router.post('/distancia/crear', controller.getInstance().create);
router.delete('/distancia/delete/:id', controller.getInstance().delete);


export default router;