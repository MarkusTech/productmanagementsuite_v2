import { Router } from "express";
import { AdjustmentReasonController } from "../controller/item_adjustmentReasonController";
import { verifyToken } from "../middlewares/authMiddlewares";

const router = Router();
const adjustmentReasonController = new AdjustmentReasonController();

// router.post(
//   "/adjustment-reason",
//   verifyToken,
//   adjustmentReasonController.createAdjustmentReason
// );
// router.get(
//   "/adjustment-reason",
//   verifyToken,
//   adjustmentReasonController.getAllAdjustmentReasons
// );
// router.get(
//   "/adjustment-reason/:adjustmentReasonID",
//   verifyToken,
//   adjustmentReasonController.getAdjustmentReasonById
// );
// router.put(
//   "/adjustment-reason/:adjustmentReasonID",
//   verifyToken,
//   adjustmentReasonController.updateAdjustmentReason
// );
// router.delete(
//   "/adjustment-reason/:adjustmentReasonID",
//   verifyToken,
//   adjustmentReasonController.deleteAdjustmentReason
// );

router.post(
  "/adjustment-reason",

  adjustmentReasonController.createAdjustmentReason
);
router.get(
  "/adjustment-reason",

  adjustmentReasonController.getAllAdjustmentReasons
);
router.get(
  "/adjustment-reason/:adjustmentReasonID",

  adjustmentReasonController.getAdjustmentReasonById
);
router.put(
  "/adjustment-reason/:adjustmentReasonID",

  adjustmentReasonController.updateAdjustmentReason
);
router.delete(
  "/adjustment-reason/:adjustmentReasonID",

  adjustmentReasonController.deleteAdjustmentReason
);

export default router;
