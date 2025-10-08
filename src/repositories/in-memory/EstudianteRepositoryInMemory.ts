import type { Estudiante } from '../../models/Estudiante.js';
import type { IEstudianteRepository } from '../IEstudianteRepository.js';
import type { CreateEstudianteDto, UpdateEstudianteDto } from '../../dtos/estudiante/index.js';
import { EstudianteBuilder } from '../../builders/EstudianteBuilder.js';
import { estudiantes as estudiantesMock } from '../../db/inMemory/index.js';

export class EstudianteRepositoryInMemory implements IEstudianteRepository {
  private estudiantes: Estudiante[] = [];
  private nextId = 1;

  constructor() {
    this.loadMockData();
  }

  private loadMockData(): void {
    // Cargar estudiantes con conversión de fechas
    this.estudiantes = estudiantesMock.map(mock => ({
      ...mock,
      fechaIngreso: new Date(mock.fechaIngreso)
    }));
    
    // Configurar nextId basado en los datos existentes
    this.nextId = this.estudiantes.length > 0 ? Math.max(...this.estudiantes.map(e => e.id)) + 1 : 1;
  }

  async create(estudiante: CreateEstudianteDto): Promise<Estudiante> {
    // ✨ Builder Pattern aplicado
    const newEstudiante = EstudianteBuilder
      .fromCreateDto(estudiante)
      .setId(this.nextId++) // El repositorio maneja la generación de ID
      .build();
    
    this.estudiantes.push(newEstudiante);
    return newEstudiante;
  }

  async findAll(): Promise<Estudiante[]> {
    return [...this.estudiantes];
  }

  async findById(id: number): Promise<Estudiante | null> {
    return this.estudiantes.find(e => e.id === id) || null;
  }

  async findByEmail(email: string): Promise<Estudiante | null> {
    return this.estudiantes.find(e => e.email.toLowerCase() === email.toLowerCase()) || null;
  }

  async findByFacultadId(facultadId: number): Promise<Estudiante[]> {
    return this.estudiantes.filter(e => e.facultadId === facultadId);
  }

  async findByPaisId(paisId: number): Promise<Estudiante[]> {
    return this.estudiantes.filter(e => e.paisId === paisId);
  }

  async update(id: number, estudiante: UpdateEstudianteDto): Promise<Estudiante | null> {
    const index = this.estudiantes.findIndex(e => e.id === id);
    if (index === -1) {
      return null;
    }
    
    const current = this.estudiantes[index]!;
    
    // ✨ Builder Pattern aplicado para update
    const updatedEstudiante = EstudianteBuilder
      .fromUpdateDto(current, estudiante)
      .build();
    
    this.estudiantes[index] = updatedEstudiante;
    return updatedEstudiante;
  }

  async delete(id: number): Promise<boolean> {
    const index = this.estudiantes.findIndex(e => e.id === id);
    if (index === -1) {
      return false;
    }
    
    this.estudiantes.splice(index, 1);
    return true;
  }
}