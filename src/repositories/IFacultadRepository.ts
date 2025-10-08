import type { Facultad } from '../models/Facultad.js';
import type { CreateFacultadDto,UpdateFacultadDto } from '../dtos/facultad/index.js';

export interface IFacultadRepository {
  create(facultad: CreateFacultadDto): Promise<Facultad>;
  findAll(): Promise<Facultad[]>;
  findById(id: number): Promise<Facultad | null>;
  update(id: number, facultad: UpdateFacultadDto): Promise<Facultad | null>;
  delete(id: number): Promise<boolean>;
}
