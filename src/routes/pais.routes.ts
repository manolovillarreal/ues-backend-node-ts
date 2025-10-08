import { Router } from 'express';
import { PaisController } from '../controllers/pais.controller.js';
import { validateDto } from '../middleware/validateDto.js';
import { CreatePaisDto, UpdatePaisDto } from '../dtos/pais/index.js';

const router = Router();
const controller = new PaisController();

// GET /api/paises - Obtener todos los países
router.get('/', controller.findAll);

// GET /api/paises/:id - Obtener país por ID
router.get('/:id', controller.findById);

// POST /api/paises - Crear nuevo país
router.post('/', 
  validateDto(CreatePaisDto),
  controller.create
);

// PUT /api/paises/:id - Actualizar país
router.put('/:id',
  validateDto(UpdatePaisDto),
  controller.update
);

// DELETE /api/paises/:id - Eliminar país
router.delete('/:id', controller.delete);

export { router as paisRoutes };