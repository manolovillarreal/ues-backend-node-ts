import { Router } from 'express';
import facultadesRouter from './facultades.routes.js';
import authRouter from './auth.routes.js';
import profesorRouter from './profesor.routes.js';
import { paisRoutes } from './pais.routes.js';
import { estudianteRoutes } from './estudiante.routes.js';
import { cursoRoutes } from './curso.routes.js';
import { proyectoRoutes } from './proyecto.routes.js';

const router = Router();
router.use('/facultades', facultadesRouter);
router.use('/auth', authRouter);
router.use('/profesores', profesorRouter);
router.use('/paises', paisRoutes);
router.use('/estudiantes', estudianteRoutes);
router.use('/cursos', cursoRoutes);
router.use('/proyectos', proyectoRoutes);

export default router;
