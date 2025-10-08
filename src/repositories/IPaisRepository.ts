import type { Pais } from '../models/Pais.js';
import type { CreatePaisDto, UpdatePaisDto } from '../dtos/pais/index.js';

export interface IPaisRepository {
  create(pais: CreatePaisDto): Promise<Pais>;
  findAll(): Promise<Pais[]>;
  findById(id: number): Promise<Pais | null>;
  findByNombre(nombre: string): Promise<Pais | null>;
  update(id: number, pais: UpdatePaisDto): Promise<Pais | null>;
  delete(id: number): Promise<boolean>;
}