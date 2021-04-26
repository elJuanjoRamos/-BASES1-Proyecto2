import { Router } from "express";
import controller from "./../controller/pais.controlle"
const router = Router();

router.get('/pais/get_all', controller.getInstance().getAll);
router.get('/pais/get/:id', controller.getInstance().getPais);
router.get('/pais/region', controller.getInstance().getRegion);
router.post('/pais/add', controller.getInstance().postPais);
router.delete('/pais/delete/:id', controller.getInstance().deletePais);
router.put('/pais/update/:id', controller.getInstance().updatePais);

export default router;