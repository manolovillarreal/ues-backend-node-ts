import type { Proyecto } from '../models/Proyecto.js';
import type { AsignarProyectoDto } from '../dtos/proyecto/index.js';

export interface IProyectoRepository {
  findAll(): Promise<Proyecto[]>;
  findById(id: number): Promise<Proyecto | null>;
  findByCursoId(cursoId: number): Promise<Proyecto[]>;
  delete(id: number): Promise<boolean>;
  
  // Métodos específicos para la integración
  findProyectosActivosByCurso(cursoId: number): Promise<Proyecto[]>;
  asignarProyectoACurso(asignarProyectoDto: AsignarProyectoDto): Promise<Proyecto>;
  desasignarProyectoDeCurso(proyectoId: number): Promise<boolean>;
}