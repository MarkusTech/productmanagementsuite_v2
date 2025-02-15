import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CustomError } from "../utils/CustomError";
import logger from "../utils/logger";

const prisma = new PrismaClient();

export class InventoryAdjustmentController {
  // Create a new InventoryAdjustment
  async createInventoryAdjustment(req: Request, res: Response): Promise<void> {
    const {
      inventoryID,
      adjustmentTypeID,
      adjustmentReasonID,
      quantityAdjusted,
      status,
      createdByID,
    } = req.body;

    try {
      // Check if inventoryID exists
      const inventory = await prisma.inventory.findUnique({
        where: { inventoryID },
      });
      if (!inventory) {
        res
          .status(400)
          .json({ success: false, message: "Inventory ID does not exist." });
      }

      // Check if adjustmentTypeID exists
      const adjustmentType = await prisma.adjustmentType.findUnique({
        where: { adjustmentTypeID },
      });
      if (!adjustmentType) {
        res.status(400).json({
          success: false,
          message: "Adjustment Type ID does not exist.",
        });
      }

      // Check if adjustmentReasonID exists
      const adjustmentReason = await prisma.adjustmentReason.findUnique({
        where: { adjustmentReasonID },
      });
      if (!adjustmentReason) {
        res.status(400).json({
          success: false,
          message: "Adjustment Reason ID does not exist.",
        });
      }

      // Create the new inventory adjustment
      const newInventoryAdjustment = await prisma.inventoryAdjustment.create({
        data: {
          inventoryID,
          adjustmentTypeID,
          adjustmentReasonID,
          quantityAdjusted,
          status,
          createdByID,
        },
      });

      logger.info(
        `InventoryAdjustment created: ID ${newInventoryAdjustment.adjustmentID}`
      );

      res.status(201).json({
        success: true,
        message: "InventoryAdjustment created successfully",
        data: newInventoryAdjustment,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error(`Error creating inventory adjustment: ${error.message}`);
        res.status(500).json({
          success: false,
          message: "Error creating inventory adjustment",
        });
      } else {
        logger.error(
          "An unexpected error occurred while creating inventory adjustment"
        );
        res
          .status(500)
          .json({ success: false, message: "An unexpected error occurred" });
      }
    }
  }

  // Get all InventoryAdjustments
  async getAllInventoryAdjustments(req: Request, res: Response): Promise<void> {
    try {
      const inventoryAdjustments = await prisma.inventoryAdjustment.findMany({
        include: {
          inventory: {
            include: {
              item: {
                select: {
                  itemID: true,
                  itemName: true, // Fetch the itemName along with itemID
                },
              },
            },
          },
          adjustmentType: true,
          adjustmentReason: true,
        },
      });

      logger.info("Fetched all inventory adjustments");

      res.status(200).json({
        success: true,
        data: inventoryAdjustments,
      });
    } catch (error) {
      logger.error(
        `Error fetching inventory adjustments: ${(error as Error).message}`
      );
      throw new CustomError("Error fetching inventory adjustments", 500);
    }
  }

  // Get InventoryAdjustment by ID
  async getInventoryAdjustmentById(req: Request, res: Response): Promise<void> {
    const { adjustmentID } = req.params;

    try {
      const inventoryAdjustment = await prisma.inventoryAdjustment.findUnique({
        where: { adjustmentID: parseInt(adjustmentID) },
      });

      if (!inventoryAdjustment) {
        logger.warn(`InventoryAdjustment with ID ${adjustmentID} not found`);
        res.status(404).json({
          success: false,
          message: "InventoryAdjustment not found",
        });
      } else {
        logger.info(`Fetched InventoryAdjustment with ID ${adjustmentID}`);
        res.status(200).json({
          success: true,
          data: inventoryAdjustment,
        });
      }
    } catch (error) {
      logger.error(
        `Error fetching inventory adjustment: ${(error as Error).message}`
      );
      throw new CustomError("Error fetching inventory adjustment", 500);
    }
  }

  // Update InventoryAdjustment
  async updateInventoryAdjustment(req: Request, res: Response): Promise<void> {
    const { adjustmentID } = req.params;
    const {
      inventoryID,
      adjustmentTypeID,
      adjustmentReasonID,
      quantityAdjusted,
      status,
      modifiedByID,
    } = req.body;

    try {
      const updatedInventoryAdjustment =
        await prisma.inventoryAdjustment.update({
          where: { adjustmentID: parseInt(adjustmentID) },
          data: {
            inventoryID,
            adjustmentTypeID,
            adjustmentReasonID,
            quantityAdjusted,
            status,
            modifiedByID,
          },
        });

      logger.info(`InventoryAdjustment with ID ${adjustmentID} updated`);

      res.status(200).json({
        success: true,
        message: "InventoryAdjustment updated successfully",
        data: updatedInventoryAdjustment,
      });
    } catch (error) {
      logger.error(
        `Error updating inventory adjustment: ${(error as Error).message}`
      );
      throw new CustomError("Error updating inventory adjustment", 500);
    }
  }

  // Delete InventoryAdjustment
  async deleteInventoryAdjustment(req: Request, res: Response): Promise<void> {
    const { adjustmentID } = req.params;

    try {
      await prisma.inventoryAdjustment.delete({
        where: { adjustmentID: parseInt(adjustmentID) },
      });

      logger.info(`InventoryAdjustment with ID ${adjustmentID} deleted`);

      res.status(200).json({
        success: true,
        message: "InventoryAdjustment deleted successfully",
      });
    } catch (error) {
      logger.error(
        `Error deleting inventory adjustment: ${(error as Error).message}`
      );
      throw new CustomError("Error deleting inventory adjustment", 500);
    }
  }
}
