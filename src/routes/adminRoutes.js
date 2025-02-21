import express from "express";
import {
    createAdmin,
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin
} from "../controllers/admin.controller.js";

import authMiddleware from "../middleware/auth.js";

const adminRouter = express.Router();

// Ruta para crear un nuevo administrador
adminRouter.post("/crear",  createAdmin);

// Ruta para obtener todos los administradores
adminRouter.get("/obtener", getAllAdmins);

// Ruta para obtener un administrador por su ID
adminRouter.get("/obtener/:id", getAdminById);

// Ruta para actualizar un administrador
adminRouter.put("/actualizar/:id", updateAdmin);

// Ruta para eliminar un administrador
adminRouter.delete("/eliminar/:id", deleteAdmin);

export default adminRouter;
