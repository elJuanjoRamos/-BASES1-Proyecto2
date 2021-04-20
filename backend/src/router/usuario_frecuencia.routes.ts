import { Router } from "express";
import controller from "./../controller/usuario_frecuencia.controller"
const router = Router();

router.get('/frecuencia/usuario/:id', controller.getInstance().getAll);
router.post('/frecuencia/crear', controller.getInstance().create);
router.delete('/frecuencia/delete/:id', controller.getInstance().delete);


export default router;