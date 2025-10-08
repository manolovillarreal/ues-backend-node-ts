import { Router } from 'express';
import { ProyectoController } from '../controllers/proyecto.controller.js';
import { EstudianteProyectoController } from '../controllers/estudiante-proyecto.controller.js';
import { validateDto } from '../middleware/validateDto.js';
import { AsignarProyectoDto } from '../dtos/proyecto/index.js';
import { CreateEstudianteProyectoDto, UpdateEstudianteProyectoDto } from '../dtos/estudiante-proyecto/index.js';

const router = Router();
const controller = new ProyectoController();
const estudianteProyectoController = new EstudianteProyectoController();

// Asignación de proyectos a cursos
// POST /api/proyectos/asignar - Asignar proyecto a curso
router.post('/asignar',
  validateDto(AsignarProyectoDto),
 controller.asignarProyectoACurso
);

// CRUD básico de proyectos
// GET /api/proyectos - Obtener todos los proyectos
router.get('/', controller.findAll);

// GET /api/proyectos/:id - Obtener proyecto por ID
router.get('/:id', controller.findById);

// PATCH /api/proyectos/:id/desasignar - Desasignar proyecto de curso
router.patch('/:id/desasignar', controller.desasignarProyectoDeCurso);

// Consultas específicas por curso
// GET /api/proyectos/curso/:cursoId - Obtener proyectos de un curso
router.get('/curso/:cursoId', controller.findByCursoId);

// GET /api/proyectos/curso/:cursoId/activos - Obtener proyectos activos de un curso
router.get('/curso/:cursoId/activos', controller.findProyectosActivosByCurso);


// Relación ManyToMany con Estudiantes
// POST /api/proyectos/:proyectoId/estudiantes - Asignar estudiante a proyecto
router.post('/:proyectoId/estudiantes',
  validateDto(CreateEstudianteProyectoDto),
  estudianteProyectoController.asignarEstudiante
);

// GET /api/proyectos/:proyectoId/estudiantes - Obtener estudiantes de un proyecto
router.get('/:proyectoId/estudiantes', estudianteProyectoController.getEstudiantesByProyecto);

// GET /api/proyectos/:proyectoId/estudiantes/activos - Obtener estudiantes activos de un proyecto
router.get('/:proyectoId/estudiantes/activos', estudianteProyectoController.getEstudiantesActivosByProyecto);

// PUT /api/proyectos/:proyectoId/estudiantes/:estudianteId - Actualizar relación estudiante-proyecto
router.put('/:proyectoId/estudiantes/:estudianteId',
  validateDto(UpdateEstudianteProyectoDto),
  estudianteProyectoController.updateEstudianteProyecto
);
// DELETE /api/proyectos/:proyectoId/estudiantes/:estudianteId - Desasignar estudiante del proyecto
router.delete('/:proyectoId/estudiantes/:estudianteId', estudianteProyectoController.desasignarEstudiante);

export { router as proyectoRoutes };