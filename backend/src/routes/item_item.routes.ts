import { Router } from "express";
import { ItemController } from "../controller/item_itemController";
import upload from "../config/multerConfig";

const router = Router();
const itemController = new ItemController();

router.post("/items", upload, itemController.createItem);
// router.post("/items", upload, itemController.createItem.bind(itemController));
router.get("/items", itemController.getAllItems);
router.get("/items/:itemID", itemController.getItemById);
router.put("/items/:itemID", itemController.updateItem);
router.delete("/items/:itemID", itemController.deleteItem);

export default router;
