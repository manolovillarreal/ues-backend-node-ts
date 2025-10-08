import type { EstudianteProyecto } from '../models/EstudianteProyecto.js';
import type { CreateEstudianteProyectoDto, UpdateEstudianteProyectoDto } from '../dtos/estudiante-proyecto/index.js';

export interface IEstudianteProyectoRepository {
  // CRUD básico
  create(estudianteProyecto: CreateEstudianteProyectoDto): Promise<EstudianteProyecto>;
  findAll(): Promise<EstudianteProyecto[]>;
  findByProyectoAndEstudiante(proyectoId: number, estudianteId: number): Promise<EstudianteProyecto | null>;
  update(proyectoId: number, estudianteId: number, estudianteProyecto: UpdateEstudianteProyectoDto): Promise<EstudianteProyecto | null>;
  delete(proyectoId: number, estudianteId: number): Promise<boolean>;

  // Métodos específicos de la relación
  findByProyectoId(proyectoId: number): Promise<EstudianteProyecto[]>;
  findByEstudianteId(estudianteId: number): Promise<EstudianteProyecto[]>;
  
  // Métodos de consulta
  findEstudiantesActivosByProyecto(proyectoId: number): Promise<EstudianteProyecto[]>;
  findProyectosActivosByEstudiante(estudianteId: number): Promise<EstudianteProyecto[]>;
  
}