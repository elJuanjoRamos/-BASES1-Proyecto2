import { Router } from "express";
import controller from "./../controller/usuario.controller"
const router = Router();

router.get('/usuario/get_all', controller.getInstance().getAll);
router.get('/usuario/get/:id', controller.getInstance().getSingle);
router.post('/auth', controller.getInstance().auth);
router.post('/usuario/crear', controller.getInstance().create);
router.delete('/usuario/delete/:id', controller.getInstance().delete);


export default router;