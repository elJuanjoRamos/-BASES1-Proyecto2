import { Router } from "express";
import controller from "./../controller/pais.controlle"
const router = Router();

router.get('/pais/get_all', controller.getInstance().getAll);
router.get('/pais/get/:id', controller.getInstance().getPais);

export default router;