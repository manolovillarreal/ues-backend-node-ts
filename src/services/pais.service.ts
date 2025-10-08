import type { Pais } from '../models/Pais.js';
import type { IPaisRepository } from '../repositories/IPaisRepository.js';
import { PaisRepositoryInMemory } from '../repositories/in-memory/PaisRepositoryInMemory.js';
import type { CreatePaisDto, UpdatePaisDto } from '../dtos/pais/index.js';

export class PaisService {
  private repo: IPaisRepository;

  constructor(repo?: IPaisRepository) {
    this.repo = repo ?? new PaisRepositoryInMemory();
  }

  async create(payload: CreatePaisDto): Promise<Pais> {
    // Validar que el nombre sea único
    const existingPais = await this.repo.findByNombre(payload.nombre);
    if (existingPais) {
      throw new Error('Ya existe un país con este nombre');
    }

    return this.repo.create(payload);
  }

  async findAll(): Promise<Pais[]> {
    return this.repo.findAll();
  }

  async findById(id: number): Promise<Pais | null> {
    return this.repo.findById(id);
  }

  async update(id: number, payload: UpdatePaisDto): Promise<Pais | null> {
    // Verificar que el país exista
    const existingPais = await this.repo.findById(id);
    if (!existingPais) {
      return null;
    }

    // Si se está actualizando el nombre, verificar que sea único
    if (payload.nombre && payload.nombre !== existingPais.nombre) {
      const paisWithName = await this.repo.findByNombre(payload.nombre);
      if (paisWithName) {
        throw new Error('Ya existe un país con este nombre');
      }
    }

    return this.repo.update(id, payload);
  }

  async delete(id: number): Promise<boolean> {
    const existingPais = await this.repo.findById(id);
    if (!existingPais) {
      return false;
    }

    // TODO: Validar que el país no tenga profesores asociados
    // antes de permitir la eliminación

    return this.repo.delete(id);
  }
}