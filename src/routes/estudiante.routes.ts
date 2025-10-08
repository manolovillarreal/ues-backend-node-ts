import { Router } from 'express';
import { EstudianteController } from '../controllers/estudiante.controller.js';
import { EstudianteProyectoController } from '../controllers/estudiante-proyecto.controller.js';
import { validateDto } from '../middleware/validateDto.js';
import { CreateEstudianteDto, UpdateEstudianteDto } from '../dtos/estudiante/index.js';

const router = Router();
const controller = new EstudianteController();
const estudianteProyectoController = new EstudianteProyectoController();

// GET /api/estudiantes - Obtener todos los estudiantes
router.get('/', (req, res) => controller.findAll(req, res));

// GET /api/estudiantes/:id - Obtener estudiante por ID
router.get('/:id', (req, res) => controller.findById(req, res));

// GET /api/estudiantes/facultad/:facultadId - Obtener estudiantes por facultad
router.get('/facultad/:facultadId', (req, res) => controller.findByFacultadId(req, res));

// POST /api/estudiantes - Crear nuevo estudiante
router.post('/', 
  validateDto(CreateEstudianteDto),
  (req, res) => controller.create(req, res)
);

// PUT /api/estudiantes/:id - Actualizar estudiante
router.put('/:id',
  validateDto(UpdateEstudianteDto),
  (req, res) => controller.update(req, res)
);

// PATCH /api/estudiantes/:id/deactivate - Desactivar estudiante
router.patch('/:id/deactivate', (req, res) => controller.deactivate(req, res));

// DELETE /api/estudiantes/:id - Eliminar estudiante
router.delete('/:id', (req, res) => controller.delete(req, res));

// Relación con Proyectos
// GET /api/estudiantes/:estudianteId/proyectos - Obtener proyectos de un estudiante
router.get('/:estudianteId/proyectos', estudianteProyectoController.getProyectosByEstudiante);

// GET /api/estudiantes/:estudianteId/proyectos/activos - Obtener proyectos activos de un estudiante
router.get('/:estudianteId/proyectos/activos', estudianteProyectoController.getProyectosActivosByEstudiante);

export { router as estudianteRoutes };