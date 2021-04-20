import { Router } from "express";
import controller from "./../controller/espirometro.controller"
const router = Router();

router.get('/espirometro/sesion/usuario/:id', controller.getInstance().getAll);
router.get('/espirometro/sesion/detalle/:id', controller.getInstance().getAllDetalle);
router.post('/espirometro/sesion/crear', controller.getInstance().create);
router.post('/espirometro/sesion/detalle/crear', controller.getInstance().createDetalle);


export default router;