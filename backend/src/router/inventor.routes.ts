import { Router } from "express";
import controller from "./../controller/inventor.controller"
const router = Router();

router.get('/inventor/inventos', controller.getInstance().getAll);
router.get('/inventor/get_all', controller.getInstance().getInventor);
router.put('/inventor/update/:id', controller.getInstance().updateInvento);

export default router;