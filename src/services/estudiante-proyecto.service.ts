import type { EstudianteProyecto } from '../models/EstudianteProyecto.js';
import type { IEstudianteProyectoRepository } from '../repositories/IEstudianteProyectoRepository.js';
import type { IEstudianteRepository } from '../repositories/IEstudianteRepository.js';
import type { IProyectoRepository } from '../repositories/IProyectoRepository.js';
import type { CreateEstudianteProyectoDto, UpdateEstudianteProyectoDto } from '../dtos/estudiante-proyecto/index.js';
import { EstudianteProyectoRepositoryInMemory } from '../repositories/in-memory/EstudianteProyectoRepositoryInMemory.js';
import { EstudianteRepositoryInMemory } from '../repositories/in-memory/EstudianteRepositoryInMemory.js';
import { ProyectoRepositoryInMemory } from '../repositories/in-memory/ProyectoRepositoryInMemory.js';

export class EstudianteProyectoService {
  constructor(
    private readonly estudianteProyectoRepo: IEstudianteProyectoRepository = new EstudianteProyectoRepositoryInMemory(),
    private readonly estudianteRepo: IEstudianteRepository = new EstudianteRepositoryInMemory(),
    private readonly proyectoRepo: IProyectoRepository = new ProyectoRepositoryInMemory()
  ) {}

  async create(payload: CreateEstudianteProyectoDto): Promise<EstudianteProyecto> {
    // Validar que el estudiante exista
    const estudiante = await this.estudianteRepo.findById(payload.estudianteId);
    if (!estudiante) {
      throw new Error('Estudiante no encontrado');
    }

    // Validar que el estudiante esté activo
    if (!estudiante.activo) {
      throw new Error('No se puede asignar proyecto a un estudiante inactivo');
    }

    // Validar que el proyecto exista
    const proyecto = await this.proyectoRepo.findById(payload.proyectoId);
    if (!proyecto) {
      throw new Error('Proyecto no encontrado');
    }

    // Validar que no exista ya la relación
    const existingRelation = await this.estudianteProyectoRepo.findByProyectoAndEstudiante(
      payload.proyectoId, 
      payload.estudianteId
    );
    if (existingRelation) {
      throw new Error('El estudiante ya está asignado a este proyecto');
    }

    return this.estudianteProyectoRepo.create(payload);
  }

  async findAll(): Promise<EstudianteProyecto[]> {
    return this.estudianteProyectoRepo.findAll();
  }

  async findByProyectoAndEstudiante(proyectoId: number, estudianteId: number): Promise<EstudianteProyecto | null> {
    return this.estudianteProyectoRepo.findByProyectoAndEstudiante(proyectoId, estudianteId);
  }

  async findByProyectoId(proyectoId: number): Promise<EstudianteProyecto[]> {
    return this.estudianteProyectoRepo.findByProyectoId(proyectoId);
  }

  async findByEstudianteId(estudianteId: number): Promise<EstudianteProyecto[]> {
    return this.estudianteProyectoRepo.findByEstudianteId(estudianteId);
  }

  async findEstudiantesActivosByProyecto(proyectoId: number): Promise<EstudianteProyecto[]> {
    return this.estudianteProyectoRepo.findEstudiantesActivosByProyecto(proyectoId);
  }

  async findProyectosActivosByEstudiante(estudianteId: number): Promise<EstudianteProyecto[]> {
    return this.estudianteProyectoRepo.findProyectosActivosByEstudiante(estudianteId);
  }

  async update(proyectoId: number, estudianteId: number, payload: UpdateEstudianteProyectoDto): Promise<EstudianteProyecto | null> {
    const existing = await this.estudianteProyectoRepo.findByProyectoAndEstudiante(proyectoId, estudianteId);
    if (!existing) {
      throw new Error('Relación EstudianteProyecto no encontrada');
    }

    return this.estudianteProyectoRepo.update(proyectoId, estudianteId, payload);
  }

  async delete(proyectoId: number, estudianteId: number): Promise<boolean> {
    const existing = await this.estudianteProyectoRepo.findByProyectoAndEstudiante(proyectoId, estudianteId);
    if (!existing) {
      return false;
    }

    return this.estudianteProyectoRepo.delete(proyectoId, estudianteId);
  }
}