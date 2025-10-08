import { Router } from 'express';
import {ProfesorController}  from '../controllers/profesor.controller.js';
import { validateDto } from '../middleware/validateDto.js';
import { CreateProfesorDto, UpdateProfesorDto } from '../dtos/profesor/index.js';

const router = Router();
const profesorController = new ProfesorController();
// GET /profesores - Obtener todos los profesores
router.get('/', profesorController.findAll);

// GET /profesores/:id - Obtener un profesor por ID
router.get('/:id', profesorController.findById);

// POST /profesores - Crear un nuevo profesor
router.post('/', validateDto(CreateProfesorDto), profesorController.create);

// PUT /profesores/:id - Actualizar un profesor
router.put('/:id', validateDto(UpdateProfesorDto), profesorController.update);

// DELETE /profesores/:id - Eliminar un profesor
router.delete('/:id', profesorController.delete);

// PATCH /profesores/:id/deactivate - Desactivar un profesor
router.patch('/:id/deactivate', profesorController.deactivate);

// PATCH /profesores/:id/activate - Activar un profesor
router.patch('/:id/activate', profesorController.activate);

export default router;