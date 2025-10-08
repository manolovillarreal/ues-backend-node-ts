import type { Profesor } from '../models/Profesor.js';
import type { IProfesorRepository } from '../repositories/IProfesorRepository.js';
import { ProfesorRepositoryInMemory } from '../repositories/in-memory/ProfesorRepositoryInMemory.js';
import type { CreateProfesorDto, UpdateProfesorDto } from '../dtos/profesor/index.js';

export class ProfesorService {
  private repo: IProfesorRepository;

  constructor(repo?: IProfesorRepository) {
    this.repo = repo ?? new ProfesorRepositoryInMemory();
  }

  async create(payload: CreateProfesorDto): Promise<Profesor> {
    // Validar que el correo sea único
    const existingProfesor = await this.repo.findByCorreo(payload.correo);
    if (existingProfesor) {
      throw new Error('Ya existe un profesor con este correo electrónico');
    }

    return this.repo.create(payload);
  }

  async findAll(): Promise<Profesor[]> {
    return this.repo.findAll();
  }

  async findById(id: number): Promise<Profesor | null> {
    return this.repo.findById(id);
  }

  async update(id: number, payload: UpdateProfesorDto): Promise<Profesor | null> {
    // Verificar que el profesor exista
    const existingProfesor = await this.repo.findById(id);
    if (!existingProfesor) {
      return null;
    }

    // Si se está actualizando el correo, verificar que sea único
    if (payload.correo && payload.correo !== existingProfesor.correo) {
      const profesorWithEmail = await this.repo.findByCorreo(payload.correo);
      if (profesorWithEmail) {
        throw new Error('Ya existe un profesor con este correo electrónico');
      }
    }

    return this.repo.update(id, payload);
  }

  async delete(id: number): Promise<boolean> {
    const existingProfesor = await this.repo.findById(id);
    if (!existingProfesor) {
      return false;
    }

    // TODO: Validar que el profesor no tenga cursos activos o proyectos ICCIS asociados
    // antes de permitir la eliminación

    return this.repo.delete(id);
  }

  async deactivate(id: number): Promise<Profesor | null> {
    return this.repo.update(id, { activo: false });
  }

  async activate(id: number): Promise<Profesor | null> {
    return this.repo.update(id, { activo: true });
  }
}