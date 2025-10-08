import type { EstudianteProyecto } from '../../models/EstudianteProyecto.js';
import type { IEstudianteProyectoRepository } from '../IEstudianteProyectoRepository.js';
import type { CreateEstudianteProyectoDto, UpdateEstudianteProyectoDto } from '../../dtos/estudiante-proyecto/index.js';
import { EstudianteProyectoBuilder } from '../../builders/EstudianteProyectoBuilder.js';
import { estudianteProyectos as estudianteProyectosMock } from '../../db/inMemory/index.js';

export class EstudianteProyectoRepositoryInMemory implements IEstudianteProyectoRepository {
  private estudianteProyectos: EstudianteProyecto[] = [];

  constructor() {
    this.loadMockData();
  }

  private loadMockData(): void {
    // Cargar relaciones estudiante-proyecto
    this.estudianteProyectos = [...estudianteProyectosMock];
  }

  async create(estudianteProyecto: CreateEstudianteProyectoDto): Promise<EstudianteProyecto> {
    const newEstudianteProyecto = EstudianteProyectoBuilder
      .fromCreateDto(estudianteProyecto)
      .build();
    
    this.estudianteProyectos.push(newEstudianteProyecto);
    return newEstudianteProyecto;
  }

  async findAll(): Promise<EstudianteProyecto[]> {
    return [...this.estudianteProyectos];
  }

  async findByProyectoAndEstudiante(proyectoId: number, estudianteId: number): Promise<EstudianteProyecto | null> {
    return this.estudianteProyectos.find(ep => 
      ep.proyectoId === proyectoId && ep.estudianteId === estudianteId
    ) || null;
  }

  async update(proyectoId: number, estudianteId: number, estudianteProyecto: UpdateEstudianteProyectoDto): Promise<EstudianteProyecto | null> {
    const index = this.estudianteProyectos.findIndex(ep => 
      ep.proyectoId === proyectoId && ep.estudianteId === estudianteId
    );
    if (index === -1) {
      return null;
    }

    const current = this.estudianteProyectos[index]!;
    const updated = EstudianteProyectoBuilder
      .fromUpdateDto(current, estudianteProyecto)
      .build();

    this.estudianteProyectos[index] = updated;
    return updated;
  }

  async delete(proyectoId: number, estudianteId: number): Promise<boolean> {
    const index = this.estudianteProyectos.findIndex(ep => 
      ep.proyectoId === proyectoId && ep.estudianteId === estudianteId
    );
    if (index === -1) {
      return false;
    }

    this.estudianteProyectos.splice(index, 1);
    return true;
  }

  async findByProyectoId(proyectoId: number): Promise<EstudianteProyecto[]> {
    return this.estudianteProyectos.filter(ep => ep.proyectoId === proyectoId);
  }

  async findByEstudianteId(estudianteId: number): Promise<EstudianteProyecto[]> {
    return this.estudianteProyectos.filter(ep => ep.estudianteId === estudianteId);
  }

  async findEstudiantesActivosByProyecto(proyectoId: number): Promise<EstudianteProyecto[]> {
    return this.estudianteProyectos.filter(ep => 
      ep.proyectoId === proyectoId && ep.activo
    );
  }

  async findProyectosActivosByEstudiante(estudianteId: number): Promise<EstudianteProyecto[]> {
    return this.estudianteProyectos.filter(ep => 
      ep.estudianteId === estudianteId && ep.activo
    );
  }
}