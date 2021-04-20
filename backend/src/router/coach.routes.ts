import { Router } from "express";
import controller from "./../controller/coach.controller"
const router = Router();

router.get('/coach/:id', controller.getInstance().getAll);
router.get('/coach/:coach/atleta/:atleta', controller.getInstance().getSingle);
router.post('/coach/crear', controller.getInstance().create);
router.delete('/coach/delete/:id', controller.getInstance().delete);


export default router;