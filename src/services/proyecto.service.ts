import type { Proyecto } from '../models/Proyecto.js';
import type { AsignarProyectoDto } from '../dtos/proyecto/index.js';
import type { IValidacionProyectoProfesorService } from './interfaces/IValidacionProyectoProfesorService.js';
import type { IValidacionAsignacionProyectoService } from './interfaces/IValidacionAsignacionProyectoService.js';
import type { IProyectoRepository } from '../repositories/IProyectoRepository.js';
import type { ICursoRepository } from '../repositories/ICursoRepository.js';
import { ValidacionProyectoProfesorService } from './impl/ValidacionProyectoProfesorService.js';
import { ValidacionAsignacionProyectoService } from './impl/ValidacionAsignacionProyectoService.js';
import { ProyectoRepositoryInMemory } from '../repositories/in-memory/ProyectoRepositoryInMemory.js';
import { CursoRepositoryInMemory } from '../repositories/in-memory/CursoRepositoryInMemory.js';

export class ProyectoService {
  constructor(
    private readonly validacionProfesor: IValidacionProyectoProfesorService = new ValidacionProyectoProfesorService(),
    private readonly validacionAsignacion: IValidacionAsignacionProyectoService = new ValidacionAsignacionProyectoService(),
    private readonly proyectoRepo: IProyectoRepository = new ProyectoRepositoryInMemory(),
    private readonly cursoRepo: ICursoRepository = new CursoRepositoryInMemory()
  ) {}

  async asignarProyectoACurso(asignarProyectoDto: AsignarProyectoDto): Promise<Proyecto> {
    const { cursoId, id: proyectoId } = asignarProyectoDto;
    
    // Validar precondiciones básicas de asignación
    await this.validacionAsignacion.validarPrecondicionesAsignacion(cursoId, proyectoId);

    // Obtener el curso para las validaciones del profesor
    const curso = await this.cursoRepo.findById(cursoId);    
    // Validar carga de trabajo del profesor
    await this.validacionProfesor.validarCargaTrabajo(curso!.profesorId);

    // Asignar el proyecto al curso
    return this.proyectoRepo.asignarProyectoACurso(asignarProyectoDto);
  }

  async findAll(): Promise<Proyecto[]> {
    return this.proyectoRepo.findAll();
  }

  async findById(id: number): Promise<Proyecto | null> {
    return this.proyectoRepo.findById(id);
  }

  async findByCursoId(cursoId: number): Promise<Proyecto[]> {
    return this.proyectoRepo.findByCursoId(cursoId);
  }

  async findProyectosActivosByCurso(cursoId: number): Promise<Proyecto[]> {
    return this.proyectoRepo.findProyectosActivosByCurso(cursoId);
  }

  async desasignarProyectoDeCurso(proyectoId: number): Promise<boolean> {
    // Validar que el proyecto exista
    const proyecto = await this.proyectoRepo.findById(proyectoId);
    if (!proyecto) {
      throw new Error('Proyecto no encontrado');
    }

    // Marcar como inactivo en lugar de eliminar
    return this.proyectoRepo.delete(proyectoId);
  }


}