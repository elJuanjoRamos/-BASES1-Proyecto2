import { Router } from "express";
import controller from "../controller/usuario_vueltas.controller"
const router = Router();

router.get('/vueltas/usuario/:id', controller.getInstance().getAll);
router.post('/vueltas/crear', controller.getInstance().create);
router.delete('/vueltas/delete/:id', controller.getInstance().delete);


export default router;