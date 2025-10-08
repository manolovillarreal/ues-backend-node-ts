import type { Profesor } from '../../models/Profesor.js';
import type { IProfesorRepository } from '../IProfesorRepository.js';
import type { CreateProfesorDto, UpdateProfesorDto } from '../../dtos/profesor/index.js';
import { ProfesorBuilder } from '../../builders/ProfesorBuilder.js';
import { profesores as profesoresMock } from '../../db/inMemory/index.js';

export class ProfesorRepositoryInMemory implements IProfesorRepository {
  private profesores: Profesor[] = [];
  private nextId = 1;

  constructor() {
    this.loadMockData();
  }

  private loadMockData(): void {
    // Cargar profesores
    this.profesores = [...profesoresMock];
    
    // Configurar nextId basado en los datos existentes
    this.nextId = this.profesores.length > 0 ? Math.max(...this.profesores.map(p => p.id)) + 1 : 1;
  }

  async create(profesor: CreateProfesorDto): Promise<Profesor> {
    // ✨ Builder Pattern aplicado
    const newProfesor = ProfesorBuilder
      .fromCreateDto(profesor)
      .setId(this.nextId++) // El repositorio maneja la generación de ID
      .build();
    
    this.profesores.push(newProfesor);
    return newProfesor;
  }

  async findAll(): Promise<Profesor[]> {
    return [...this.profesores];
  }

  async findById(id: number): Promise<Profesor | null> {
    return this.profesores.find(p => p.id === id) || null;
  }

  async findByCorreo(correo: string): Promise<Profesor | null> {
    return this.profesores.find(p => p.correo === correo) || null;
  }

  async update(id: number, profesor: UpdateProfesorDto): Promise<Profesor | null> {
    const index = this.profesores.findIndex(p => p.id === id);
    if (index === -1) {
      return null;
    }
    
    const current = this.profesores[index]!;
    
    // ✨ Builder Pattern aplicado para update
    const updatedProfesor = ProfesorBuilder
      .fromUpdateDto(current, profesor)
      .build();
    
    this.profesores[index] = updatedProfesor;
    return updatedProfesor;
  }

  async delete(id: number): Promise<boolean> {
    const index = this.profesores.findIndex(p => p.id === id);
    if (index === -1) {
      return false;
    }
    
    this.profesores.splice(index, 1);
    return true;
  }
}