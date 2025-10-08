import type { Facultad } from '../models/Facultad.js';
import type { IFacultadRepository } from '../repositories/IFacultadRepository.js';
import { FacultadRepositoryInMemory } from '../repositories/in-memory/FacultadRepositoryInMemory.js';
import type { CreateFacultadDto,UpdateFacultadDto } from '../dtos/facultad/index.js';

export class FacultadService {
  private repo: IFacultadRepository;

  constructor(repo?: IFacultadRepository) {
    this.repo = repo ?? new FacultadRepositoryInMemory();
  }

  async create(payload: CreateFacultadDto): Promise<Facultad> {
    // Aquí pueden ir reglas de negocio (p.ej. nombre único)
    // Por ahora simplemente delegamos al repositorio
    return this.repo.create(payload);
  }

  async findAll(): Promise<Facultad[]> {
    return this.repo.findAll();
  }

  async findById(id: number): Promise<Facultad | null> {
    return this.repo.findById(id);
  }

  async update(id: number, payload: UpdateFacultadDto): Promise<Facultad | null> {
    // Verificar que la facultad exista
    const existingFacultad = await this.repo.findById(id);
    if (!existingFacultad) {
      return null;
    }

    return this.repo.update(id, payload);
  }

  async delete(id: number): Promise<boolean> {
    const existingFacultad = await this.repo.findById(id);
    if (!existingFacultad) {
      return false;
    }

    return this.repo.delete(id);
  }
}
