import type { Profesor } from '../../models/Profesor.js';
import type { Curso } from '../../models/Curso.js';

export class NotificacionProfesorDto {
  curso!: Curso;
  profesor!: Profesor;
  profesorRetirado?: Profesor | undefined;
}