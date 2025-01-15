// routes/publicacion.routes.js

import express from 'express';
import { getPublicacion, getPublicacionById, postPublicacion, putPublicacionById, deletePublicacionById } from '../controllers/publicacion.controller.js';
import authMiddleware from '../middleware/auth.js';

const publicacionRouter = express.Router();

// Rutas de publicaciones
publicacionRouter.get('/obtener', getPublicacion); // Probado
publicacionRouter.get('/obtener/:id', getPublicacionById); // Probado
// publicacionRouter.post('/crear', authMiddleware("superadmin"), postPublicacion); //Probado
publicacionRouter.post('/crear', postPublicacion); //Probado
// publicacionRouter.put('/actualizar/:id', authMiddleware("superadmin"), putPublicacionById); // Probado
publicacionRouter.put('/actualizar/:id', putPublicacionById); // Probado
// publicacionRouter.delete('/eliminar/:id', authMiddleware("superadmin"), deletePublicacionById); // Probado
publicacionRouter.delete('/eliminar/:id', deletePublicacionById); // Probado

export default publicacionRouter;

