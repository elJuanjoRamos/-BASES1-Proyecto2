import { Router } from "express";
import controller from "../controller/usuario_velocidad.controller"
const router = Router();

router.get('/velocidad/usuario/:id', controller.getInstance().getAll);
router.post('/velocidad/crear', controller.getInstance().create);
router.delete('/velocidad/delete/:id', controller.getInstance().delete);


export default router;