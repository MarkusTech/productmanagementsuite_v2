import { Router } from "express";
import { LocationController } from "../controller/item_locationController";
import { verifyToken } from "../middlewares/authMiddlewares";

const router = Router();
const locationController = new LocationController();

// router.post("/locations", verifyToken, locationController.createLocation);
// router.get("/locations", verifyToken, locationController.getAllLocations);
// router.get(
//   "/locations/:locationID",
//   verifyToken,
//   locationController.getLocationById
// );
// router.put(
//   "/locations/:locationID",
//   verifyToken,
//   locationController.updateLocation
// );
// router.delete(
//   "/locations/:locationID",
//   verifyToken,
//   locationController.deleteLocation
// );

router.post("/locations", locationController.createLocation);
router.get("/locations", locationController.getAllLocations);
router.get("/locations/:locationID", locationController.getLocationById);
router.put("/locations/:locationID", locationController.updateLocation);
router.delete("/locations/:locationID", locationController.deleteLocation);

export default router;
