import { Router } from "express";
import controller from "./../controller/usuario_temperatura.controller"
const router = Router();

router.get('/temperatura/usuario/:id', controller.getInstance().getAll);
router.post('/temperatura/crear', controller.getInstance().create);
router.delete('/temperatura/delete/:id', controller.getInstance().delete);


export default router;