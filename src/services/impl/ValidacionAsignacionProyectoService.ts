import type { IValidacionAsignacionProyectoService } from '../interfaces/IValidacionAsignacionProyectoService.js';
import type { ICursoRepository } from '../../repositories/ICursoRepository.js';
import type { IProyectoRepository } from '../../repositories/IProyectoRepository.js';
import { CursoRepositoryInMemory } from '../../repositories/in-memory/CursoRepositoryInMemory.js';
import { ProyectoRepositoryInMemory } from '../../repositories/in-memory/ProyectoRepositoryInMemory.js';

export class ValidacionAsignacionProyectoService implements IValidacionAsignacionProyectoService {
  constructor(
    private readonly cursoRepo: ICursoRepository = new CursoRepositoryInMemory(),
    private readonly proyectoRepo: IProyectoRepository = new ProyectoRepositoryInMemory()
  ) {}

  async validarPrecondicionesAsignacion(cursoId: number, proyectoId: number): Promise<void> {
    // Validar que el curso exista
    const curso = await this.cursoRepo.findById(cursoId);
    if (!curso) {
      throw new Error('Curso no encontrado');
    }

    // Validar que el curso esté activo
    if (!curso.activo) {
      throw new Error('No se puede asignar proyecto a un curso inactivo');
    }

    /*TODO: Validar que el proyecto exista en el dominio de ICCIS (externo)
            con una consulta a la API de ICCIS
    */
    // Validar que el proyecto exista en el dominio externo
    // await this.validarProyectoExisteEnICCIS(proyectoId);

    // Validar que el proyecto no esté ya asignado a otro curso activo en nuestro dominio
    const proyecto = await this.proyectoRepo.findById(proyectoId);
    if (proyecto && proyecto.cursoId) {
      throw new Error('El proyecto ya está asignado a otro curso activo');
    }

    // Validar que el curso no tenga ya un proyecto activo
    const proyectosActivos = await this.proyectoRepo.findProyectosActivosByCurso(cursoId);
    if (proyectosActivos.length > 0) {
      throw new Error('El curso ya tiene un proyecto activo asignado');
    }
  }

  /**
   * Método privado para futuras validaciones con API externa
   * @param proyectoId ID del proyecto a validar
   */
  private async validarProyectoExisteEnICCIS(proyectoId: number): Promise<void> {
    // TODO: Implementar consulta a API externa de ICCIS
    // const response = await fetch(`${ICCIS_API_URL}/proyectos/${proyectoId}`);
    // if (!response.ok) {
    //   throw new Error('Proyecto no encontrado en el sistema ICCIS');
    // }
    
    // Por ahora, simplemente validamos que el ID sea válido
    if (proyectoId <= 0) {
      throw new Error('ID de proyecto inválido');
    }
  }
}