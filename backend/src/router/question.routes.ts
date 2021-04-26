import { Router } from "express";
import controller from "./../controller/question.controller"
const router = Router();

router.get('/encuesta/get_all', controller.getInstance().getEncuesta);
router.get('/question/get_all', controller.getInstance().getQuestion);

router.post('/question/add', controller.getInstance().postQuestion);
router.delete('/question/delete/:id', controller.getInstance().deleteQuestion);
router.put('/question/update/:id', controller.getInstance().updateQuestion);

export default router;