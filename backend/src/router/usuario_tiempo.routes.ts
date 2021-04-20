import { Router } from "express";
import controller from "../controller/usuario_tiempo.controller"
const router = Router();

router.get('/tiempo/usuario/:id', controller.getInstance().getAll);
router.post('/tiempo/crear', controller.getInstance().create);
router.delete('/tiempo/delete/:id', controller.getInstance().delete);


export default router;