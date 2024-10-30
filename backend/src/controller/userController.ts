import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { CustomError } from "../utils/CustomError";
import logger from "../utils/logger";
import Joi from "joi";

const prisma = new PrismaClient();

export class UserController {
  // Create a new user
  async createUser(req: Request, res: Response): Promise<void> {
    const schema = Joi.object({
      firstName: Joi.string().min(2).max(25).required(),
      middleName: Joi.string().max(25).allow(null, ""),
      lastName: Joi.string().min(2).max(25).required(),
      roleID: Joi.number().required(),
      username: Joi.string().min(2).max(25).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      phoneNumber: Joi.string().allow(null, ""),
      address: Joi.string().allow(null, ""),
      birthday: Joi.date().allow(null),
      createdByID: Joi.number().required(),
      modifiedByID: Joi.number().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }

    const {
      firstName,
      middleName,
      lastName,
      roleID,
      username,
      email,
      password,
      phoneNumber,
      address,
      birthday,
      createdByID,
      modifiedByID,
    } = req.body;

    // Optional image URL
    let image_url: string | null = req.file ? req.file.path : null;

    try {
      // Check if user already exists
      const existingUser = await prisma.users.findUnique({
        where: { email },
      });
      if (existingUser) {
        res.status(400).json({
          success: false,
          message: "User with this email already exists.",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = await prisma.users.create({
        data: {
          firstName,
          middleName,
          lastName,
          roleID: parseInt(roleID, 10),
          username,
          email,
          password: hashedPassword,
          phoneNumber,
          address,
          birthday,
          image_url,
          createdByID,
          modifiedByID,
        },
      });

      // Response upon successful user creation
      res.status(201).json({
        success: true,
        message: "User created successfully",
        user: newUser,
      });
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Error creating user: ${error.message}`);
        res
          .status(500)
          .json({ success: false, message: "Error creating user" });
      }

      logger.error("Unknown error occurred during user creation");
      res.status(500).json({ success: false, message: "Unknown error" });
    }
  }

  // Get all users
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await prisma.users.findMany();
      logger.info("Fetched all users");
      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Error fetching users: ${error.message}`);
        throw new CustomError("Error fetching users", 500);
      } else {
        logger.error("Unknown error occurred while fetching users");
        throw new CustomError("Unknown error", 500);
      }
    }
  }

  // Get user by ID
  async getUserById(req: Request, res: Response): Promise<void> {
    const { userID } = req.params;

    try {
      const user = await prisma.users.findUnique({
        where: { userID: parseInt(userID) },
      });

      if (!user) {
        logger.warn(`User with ID ${userID} not found`);
        throw new CustomError("User not found", 404);
      } else {
        logger.info(`Fetched user with ID ${userID}`);
        res.status(200).json({
          success: true,
          data: user,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Error fetching user: ${error.message}`);
        throw new CustomError("Error fetching user", 500);
      } else {
        logger.error("Unknown error occurred while fetching user");
        throw new CustomError("Unknown error", 500);
      }
    }
  }

  // Update user
  async updateUser(req: Request, res: Response): Promise<void> {
    const { userID } = req.params;
    const {
      firstName,
      middleName,
      lastName,
      roleID,
      username,
      email,
      phoneNumber,
      address,
      birthday,
      status,
      image_url,
      modifiedByID,
    } = req.body;

    try {
      const updatedUser = await prisma.users.update({
        where: { userID: parseInt(userID) },
        data: {
          firstName,
          middleName,
          lastName,
          roleID,
          username,
          email,
          phoneNumber,
          address,
          birthday,
          status,
          image_url,
          modifiedByID,
        },
      });

      logger.info(`User with ID ${userID} updated`);

      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Error updating user: ${error.message}`);
        throw new CustomError("Error updating user", 500);
      } else {
        logger.error("Unknown error occurred while updating user");
        throw new CustomError("Unknown error", 500);
      }
    }
  }

  // Delete user
  async deleteUser(req: Request, res: Response): Promise<void> {
    const { userID } = req.params;

    try {
      await prisma.users.delete({
        where: { userID: parseInt(userID) },
      });

      logger.info(`User with ID ${userID} deleted`);

      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Error deleting user: ${error.message}`);
        throw new CustomError("Error deleting user", 500);
      } else {
        logger.error("Unknown error occurred while deleting user");
        throw new CustomError("Unknown error", 500);
      }
    }
  }

  async getAllUserRoles(req: Request, res: Response): Promise<void> {
    try {
      const roles = await prisma.userRole.findMany();

      logger.info(`Fetched all user roles`);
      res.status(200).json({
        success: true,
        data: roles,
      });
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Error fetching user roles: ${error.message}`);
        throw new CustomError("Error fetching user roles", 500);
      } else {
        logger.error("Unknown error occurred while fetching user roles");
        throw new CustomError("Unknown error", 500);
      }
    }
  }
}
