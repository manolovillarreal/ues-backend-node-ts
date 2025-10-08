import type { IValidacionProyectoProfesorService } from '../interfaces/IValidacionProyectoProfesorService.js';
import type { IProfesorRepository } from '../../repositories/IProfesorRepository.js';
import type { ICursoRepository } from '../../repositories/ICursoRepository.js';
import type { IProyectoRepository } from '../../repositories/IProyectoRepository.js';
import { ProfesorRepositoryInMemory } from '../../repositories/in-memory/ProfesorRepositoryInMemory.js';
import { CursoRepositoryInMemory } from '../../repositories/in-memory/CursoRepositoryInMemory.js';
import { ProyectoRepositoryInMemory } from '../../repositories/in-memory/ProyectoRepositoryInMemory.js';

export class ValidacionProyectoProfesorService implements IValidacionProyectoProfesorService {
  constructor(
    private readonly profesorRepo: IProfesorRepository = new ProfesorRepositoryInMemory(),
    private readonly cursoRepo: ICursoRepository = new CursoRepositoryInMemory(),
    private readonly proyectoRepo: IProyectoRepository = new ProyectoRepositoryInMemory()
  ) {}


  async validarCargaTrabajo(profesorId: number): Promise<void> {
    // Obtener todos los cursos activos del profesor
    const cursosActivos = await this.cursoRepo.findByProfesorId(profesorId);
    const cursosActivosDelProfesor = cursosActivos.filter(c => c.activo);

    // Verificar si algún curso del profesor ya tiene un proyecto asignado
    for (const curso of cursosActivosDelProfesor) {
      const proyectosDelCurso = await this.proyectoRepo.findProyectosActivosByCurso(curso.id!);
      
      if (proyectosDelCurso.length > 0) {
        throw new Error(
          `El profesor ya tiene un proyecto asignado en el curso "${curso.nombre}" (ID: ${curso.id}). ` +
          'No se pueden asignar múltiples proyectos a cursos del mismo profesor.'
        );
      }
    }

    // Si llegamos aquí, el profesor puede recibir un nuevo proyecto
  }

}