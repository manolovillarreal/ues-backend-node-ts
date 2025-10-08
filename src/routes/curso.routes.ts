import { Router } from 'express';
import { CursoController } from '../controllers/curso.controller.js';
import { validateDto } from '../middleware/validateDto.js';
import { CreateCursoDto,UpdateCursoDto} from '../dtos/curso/index.js';

const router = Router();
const controller = new CursoController();

// CRUD básico
// GET /api/cursos - Obtener todos los cursos
router.get('/', (req, res) => controller.findAll(req, res));

// GET /api/cursos/:id - Obtener curso por ID
router.get('/:id', (req, res) => controller.findById(req, res));

// GET /api/cursos/facultad/:facultadId - Obtener cursos por facultad
router.get('/facultad/:facultadId', (req, res) => controller.findByFacultadId(req, res));

// GET /api/cursos/profesor/:profesorId - Obtener cursos por profesor
router.get('/profesor/:profesorId', (req, res) => controller.findByProfesorId(req, res));

// POST /api/cursos - Crear nuevo curso
router.post('/', 
  validateDto(CreateCursoDto),
  (req, res) => controller.create(req, res)
);

// PUT /api/cursos/:id - Actualizar curso
router.put('/:id',
  validateDto(UpdateCursoDto),
  (req, res) => controller.update(req, res)
);

// PATCH /api/cursos/:id/deactivate - Desactivar curso
router.patch('/:id/deactivate', (req, res) => controller.deactivate(req, res));

// DELETE /api/cursos/:id - Eliminar curso
router.delete('/:id', (req, res) => controller.delete(req, res));

// Relación ManyToMany con Estudiantes
// POST /api/cursos/:id/estudiantes - Inscribir estudiante en curso
router.post('/:id/estudiantes',
  validateDto({ estudianteId: 'number' }),
  (req, res) => controller.inscribirEstudiante(req, res)
);

// DELETE /api/cursos/:id/estudiantes/:estudianteId - Desinscribir estudiante del curso
router.delete('/:id/estudiantes/:estudianteId', (req, res) => controller.desinscribirEstudiante(req, res));

// GET /api/cursos/:id/estudiantes - Obtener estudiantes de un curso
router.get('/:id/estudiantes', (req, res) => controller.getEstudiantesByCurso(req, res));

// GET /api/cursos/estudiante/:estudianteId/cursos - Obtener cursos de un estudiante
router.get('/estudiante/:estudianteId/cursos', (req, res) => controller.getCursosByEstudiante(req, res));

export { router as cursoRoutes };