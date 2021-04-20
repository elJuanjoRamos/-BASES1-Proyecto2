import { Router } from "express";
import controller from "./../controller/usuario_oxigeno.controller"
const router = Router();

router.get('/oxigeno/usuario/:id', controller.getInstance().getAll);
router.post('/oxigeno/crear', controller.getInstance().create);
router.delete('/oxigeno/delete/:id', controller.getInstance().delete);


export default router;