import { Router } from "express";
import controller from "./../controller/entrenamiento.controller"
const router = Router();

router.get('/entrenamiento/usuario/:id', controller.getInstance().getAll);
router.get('/entrenamiento/detalle/:id', controller.getInstance().getAllDetalle);
router.post('/entrenamiento/crear', controller.getInstance().create);
router.post('/entrenamiento/detalle/crear', controller.getInstance().createDetalle);
router.delete('/entrenamiento/delete/:id', controller.getInstance().delete);


export default router;