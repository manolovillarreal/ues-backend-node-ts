import type { Estudiante } from '../models/Estudiante.js';
import type { CreateEstudianteDto, UpdateEstudianteDto } from '../dtos/estudiante/index.js';

export interface IEstudianteRepository {
  create(estudiante: CreateEstudianteDto): Promise<Estudiante>;
  findAll(): Promise<Estudiante[]>;
  findById(id: number): Promise<Estudiante | null>;
  findByEmail(email: string): Promise<Estudiante | null>;
  findByFacultadId(facultadId: number): Promise<Estudiante[]>;
  findByPaisId(paisId: number): Promise<Estudiante[]>;
  update(id: number, estudiante: UpdateEstudianteDto): Promise<Estudiante | null>;
  delete(id: number): Promise<boolean>;
}