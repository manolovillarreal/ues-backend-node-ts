import type { Pais } from '../../models/Pais.js';
import type { IPaisRepository } from '../IPaisRepository.js';
import type { CreatePaisDto, UpdatePaisDto } from '../../dtos/pais/index.js';
import { PaisBuilder } from '../../builders/PaisBuilder.js';
import { paises as paisesMock } from '../../db/inMemory/index.js';

export class PaisRepositoryInMemory implements IPaisRepository {
  private paises: Pais[] = [];
  private nextId = 1;

  constructor() {
    this.loadMockData();
  }

  private loadMockData(): void {
    // Cargar países
    this.paises = [...paisesMock];
    
    // Configurar nextId basado en los datos existentes
    this.nextId = this.paises.length > 0 ? Math.max(...this.paises.map(p => p.id)) + 1 : 1;
  }

  async create(pais: CreatePaisDto): Promise<Pais> {
    // ✨ Builder Pattern aplicado
    const newPais = PaisBuilder
      .fromCreateDto(pais)
      .setId(this.nextId++) // El repositorio maneja la generación de ID
      .build();
    
    this.paises.push(newPais);
    return newPais;
  }

  async findAll(): Promise<Pais[]> {
    return [...this.paises];
  }

  async findById(id: number): Promise<Pais | null> {
    return this.paises.find(p => p.id === id) || null;
  }

  async findByNombre(nombre: string): Promise<Pais | null> {
    return this.paises.find(p => p.nombre.toLowerCase() === nombre.toLowerCase()) || null;
  }

  async update(id: number, pais: UpdatePaisDto): Promise<Pais | null> {
    const index = this.paises.findIndex(p => p.id === id);
    if (index === -1) {
      return null;
    }
    
    const current = this.paises[index]!;
    
    // ✨ Builder Pattern aplicado para update
    const updatedPais = PaisBuilder
      .fromUpdateDto(current, pais)
      .build();
    
    this.paises[index] = updatedPais;
    return updatedPais;
  }

  async delete(id: number): Promise<boolean> {
    const index = this.paises.findIndex(p => p.id === id);
    if (index === -1) {
      return false;
    }
    
    this.paises.splice(index, 1);
    return true;
  }
}