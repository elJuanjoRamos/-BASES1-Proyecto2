import { Router } from "express";
import controller from "./../controller/response.controller"
const router = Router();

router.get('/answer/get_all', controller.getInstance().getAll);
router.get('/answer/posible/:id', controller.getInstance().getAnswer);
router.put('/answer/update/:id', controller.getInstance().updateAnswer);

export default router;