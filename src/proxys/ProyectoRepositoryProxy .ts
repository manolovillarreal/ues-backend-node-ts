import type { IProyectoRepository } from '../repositories/IProyectoRepository.js';
import type { Proyecto } from '../models/Proyecto.js';
import type { AsignarProyectoDto } from '../dtos/proyecto/index.js';
import { ICCISService } from '../services/ICCIS.service.js';

/**
 * Proxy del repositorio de proyectos.
 * Se encarga de complementar la información del proyecto con datos del dominio ICCIS
 * al momento de las consultas, mientras delega las demás operaciones al repositorio real.
 */
export class ProyectoRepositoryProxy implements IProyectoRepository {
  constructor(
    private readonly innerRepository: IProyectoRepository,
    private readonly iccisService: ICCISService
  ) {}

  // 🔹 Consulta por ID
  async findById(id: number): Promise<Proyecto | null> {
    const proyecto = await this.innerRepository.findById(id);
    if (!proyecto) return null;

    return await this.enriquecerProyecto(proyecto);
  }

  // 🔹 Consulta por curso
  async findByCursoId(cursoId: number): Promise<Proyecto[]> {
    const proyectos = await this.innerRepository.findByCursoId(cursoId);
    return await this.enriquecerProyectos(proyectos);
  }

  // 🔹 Consulta general
  async findAll(): Promise<Proyecto[]> {
    const proyectos = await this.innerRepository.findAll();
    return await this.enriquecerProyectos(proyectos);
  }

  // 🔹 Consulta de proyectos activos (se enriquece también)
  async findProyectosActivosByCurso(cursoId: number): Promise<Proyecto[]> {
    const proyectos = await this.innerRepository.findProyectosActivosByCurso(cursoId);
    return await this.enriquecerProyectos(proyectos);
  }

  // 🔹 Asignar proyecto a curso (delegado al repositorio real)
  async asignarProyectoACurso(asignarProyectoDto: AsignarProyectoDto): Promise<Proyecto> {
    return this.innerRepository.asignarProyectoACurso(asignarProyectoDto);
  }

  // 🔹 Desasignar proyecto (delegado)
  async desasignarProyectoDeCurso(proyectoId: number): Promise<boolean> {
    return this.innerRepository.desasignarProyectoDeCurso(proyectoId);
  }

  // 🔹 Eliminar proyecto (delegado)
  async delete(id: number): Promise<boolean> {
    return this.innerRepository.delete(id);
  }

  // ========================================================
  // Métodos privados de apoyo
  // ========================================================

  private async enriquecerProyectos(proyectos: Proyecto[]): Promise<Proyecto[]> {
    return Promise.all(proyectos.map(p => this.enriquecerProyecto(p)));
  }

  private async enriquecerProyecto(proyecto: Proyecto): Promise<Proyecto> {
    // Si ya tiene los datos externos, no hace falta enriquecer
    if (proyecto.nombre) return proyecto;

    try {
      const dataICCIS = await this.iccisService.getProyectoById(proyecto.id);
      return { ...proyecto, ...dataICCIS };
    } catch {
      console.warn(`No se pudo obtener información del proyecto ICCIS (ID: ${proyecto.id})`);
      return proyecto;
    }
  }
}
