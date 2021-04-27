import { Router } from "express";
import controller from "./../controller/inventor.controller"
const router = Router();

router.get('/inventor/inventos', controller.getInstance().getAll);
router.get('/inventor/get_all', controller.getInstance().getInventor);

export default router;
