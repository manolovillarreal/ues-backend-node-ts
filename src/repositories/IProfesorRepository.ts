import type { Profesor } from '../models/Profesor.js';
import type { CreateProfesorDto, UpdateProfesorDto } from '../dtos/profesor/index.js';

export interface IProfesorRepository {
  create(profesor: CreateProfesorDto): Promise<Profesor>;
  findAll(): Promise<Profesor[]>;
  findById(id: number): Promise<Profesor | null>;
  findByCorreo(correo: string): Promise<Profesor | null>;
  update(id: number, profesor: UpdateProfesorDto): Promise<Profesor | null>;
  delete(id: number): Promise<boolean>;
}