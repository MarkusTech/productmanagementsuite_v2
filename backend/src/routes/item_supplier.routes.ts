import { Router } from "express";
import { SupplierController } from "../controller/item_supplierController";
import { verifyToken } from "../middlewares/authMiddlewares";
const router = Router();
const supplierController = new SupplierController();

// router.post("/suppliers", verifyToken, supplierController.createSupplier);
// router.get("/suppliers", verifyToken, supplierController.getAllSuppliers);
// router.get(
//   "/suppliers/:supplierID",
//   verifyToken,
//   supplierController.getSupplierById
// );
// router.put(
//   "/suppliers/:supplierID",
//   verifyToken,
//   supplierController.updateSupplier
// );
// router.delete(
//   "/suppliers/:supplierID",
//   verifyToken,
//   supplierController.deleteSupplier
// );

router.post("/suppliers", supplierController.createSupplier);
router.get("/suppliers", supplierController.getAllSuppliers);
router.get("/suppliers/:supplierID", supplierController.getSupplierById);
router.put("/suppliers/:supplierID", supplierController.updateSupplier);
router.delete("/suppliers/:supplierID", supplierController.deleteSupplier);

export default router;
