import { Router } from "express";
import { PoReceivingController } from "../controller/po_poReceivingController";
import { verifyToken } from "../middlewares/authMiddlewares";

const router = Router();
const poReceivingController = new PoReceivingController();

// router.post(
//   "/po-receiving",
//   verifyToken,
//   poReceivingController.createPoReceiving
// );
// router.get(
//   "/po-receiving",
//   verifyToken,
//   poReceivingController.getAllPoReceiving
// );
// router.get(
//   "/po-receiving/:poReceivingID",
//   verifyToken,
//   poReceivingController.getPoReceivingById
// );
// router.put(
//   "/po-receiving/:poReceivingID",
//   verifyToken,
//   poReceivingController.updatePoReceiving
// );
// router.delete(
//   "/po-receiving/:poReceivingID",
//   verifyToken,
//   poReceivingController.deletePoReceiving
// );

router.post("/po-receiving", poReceivingController.createPoReceiving);
router.get("/po-receiving", poReceivingController.getAllPoReceiving);
router.get(
  "/po-receiving/:poReceivingID",
  poReceivingController.getPoReceivingById
);
router.put(
  "/po-receiving/:poReceivingID",
  poReceivingController.updatePoReceiving
);
router.delete(
  "/po-receiving/:poReceivingID",
  poReceivingController.deletePoReceiving
);

export default router;
