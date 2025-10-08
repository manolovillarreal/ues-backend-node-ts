import type { IFacultadRepository } from '../IFacultadRepository.js';
import type { Facultad } from '../../models/Facultad.js';
import type { CreateFacultadDto, UpdateFacultadDto } from '../../dtos/facultad/index.js';
import { FacultadBuilder } from '../../builders/FacultadBuilder.js';
import { facultades as facultadesMock } from '../../db/inMemory/index.js';

export class FacultadRepositoryInMemory implements IFacultadRepository {
  private data = new Map<number, Facultad>();
  private counter = 1;

  constructor() {
    this.loadMockData();
  }

  private loadMockData(): void {
    // Cargar facultades en el Map
    facultadesMock.forEach(facultad => {
      this.data.set(facultad.id, facultad);
    });
    
    // Configurar counter basado en los datos existentes
    this.counter = facultadesMock.length > 0 ? Math.max(...facultadesMock.map(f => f.id)) + 1 : 1;
  }

  async create(facultad: CreateFacultadDto): Promise<Facultad> {
    // ✨ Builder Pattern aplicado
    const newFacultad = FacultadBuilder
      .fromCreateDto(facultad)
      .setId(this.counter++) // El repositorio maneja la generación de ID
      .build();
    
    this.data.set(newFacultad.id, newFacultad);
    return newFacultad;
  }

  async findAll(): Promise<Facultad[]> {
    return Array.from(this.data.values());
  }

  async findById(id: number): Promise<Facultad | null> {
    return this.data.get(id) ?? null;
  }

  async update(id: number, facultad: UpdateFacultadDto): Promise<Facultad | null> {
    const current = this.data.get(id);
    if (!current) {
      return null;
    }
    
    // ✨ Builder Pattern aplicado para update
    const updatedFacultad = FacultadBuilder
      .fromUpdateDto(current, facultad)
      .build();
    
    this.data.set(id, updatedFacultad);
    return updatedFacultad;
  }

  async delete(id: number): Promise<boolean> {
    return this.data.delete(id);
  }
}