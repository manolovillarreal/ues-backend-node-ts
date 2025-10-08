import { Router } from 'express';
import {FacultadesController} from '../controllers/facultades.controller.js';
import { validateDto } from '../middleware/validateDto.js';
import { CreateFacultadDto, UpdateFacultadDto } from '../dtos/facultad/index.js';

const router = Router();
const facultadesController = new FacultadesController();

// CRUD básico
// GET /api/facultades - Obtener todas las facultades
router.get('/', (req, res, next) => facultadesController.findAll(req, res, next));

// GET /api/facultades/:id - Obtener facultad por ID
router.get('/:id', (req, res, next) => facultadesController.findById(req, res, next));

// POST /api/facultades - Crear nueva facultad
router.post('/', 
  validateDto(CreateFacultadDto), 
  (req, res, next) => facultadesController.create(req, res, next)
);

// PUT /api/facultades/:id - Actualizar facultad
router.put('/:id',
  validateDto(UpdateFacultadDto),
  (req, res, next) => facultadesController.update(req, res, next)
);

// DELETE /api/facultades/:id - Eliminar facultad
router.delete('/:id', (req, res, next) => facultadesController.delete(req, res, next));

export default router;
