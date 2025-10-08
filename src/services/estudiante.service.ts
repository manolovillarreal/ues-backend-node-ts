import type { Estudiante } from '../models/Estudiante.js';
import type { IEstudianteRepository } from '../repositories/IEstudianteRepository.js';
import { EstudianteRepositoryInMemory } from '../repositories/in-memory/EstudianteRepositoryInMemory.js';
import type { CreateEstudianteDto, UpdateEstudianteDto } from '../dtos/estudiante/index.js';
import type { IFacultadRepository } from '../repositories/IFacultadRepository.js';
import { FacultadRepositoryInMemory } from '../repositories/in-memory/FacultadRepositoryInMemory.js';
import type { IPaisRepository } from '../repositories/IPaisRepository.js';
import { PaisRepositoryInMemory } from '../repositories/in-memory/PaisRepositoryInMemory.js';

export class EstudianteService {
  private repo: IEstudianteRepository;
  private facultadRepo: IFacultadRepository;
  private paisRepo: IPaisRepository;

  constructor(
    repo?: IEstudianteRepository,
    facultadRepo?: IFacultadRepository,
    paisRepo?: IPaisRepository
  ) {
    this.repo = repo ?? new EstudianteRepositoryInMemory();
    this.facultadRepo = facultadRepo ?? new FacultadRepositoryInMemory();
    this.paisRepo = paisRepo ?? new PaisRepositoryInMemory();
  }

  async create(payload: CreateEstudianteDto): Promise<Estudiante> {
    // Validar que el email sea único
    const existingEstudiante = await this.repo.findByEmail(payload.email);
    if (existingEstudiante) {
      throw new Error('Ya existe un estudiante con este email');
    }

    // Validar que la facultad exista (relación ManyToOne)
    const facultad = await this.facultadRepo.findById(payload.facultadId);
    if (!facultad) {
      throw new Error('La facultad especificada no existe');
    }

    // Validar que el país exista si se proporciona
    if (payload.paisId) {
      const pais = await this.paisRepo.findById(payload.paisId);
      if (!pais) {
        throw new Error('El país especificado no existe');
      }
    }

    return this.repo.create(payload);
  }

  async findAll(): Promise<Estudiante[]> {
    return this.repo.findAll();
  }

  async findById(id: number): Promise<Estudiante | null> {
    return this.repo.findById(id);
  }

  async findByFacultadId(facultadId: number): Promise<Estudiante[]> {
    return this.repo.findByFacultadId(facultadId);
  }

  async findByPaisId(paisId: number): Promise<Estudiante[]> {
    return this.repo.findByPaisId(paisId);
  }

  async update(id: number, payload: UpdateEstudianteDto): Promise<Estudiante | null> {
    // Verificar que el estudiante exista
    const existingEstudiante = await this.repo.findById(id);
    if (!existingEstudiante) {
      return null;
    }

    // Si se está actualizando el email, verificar que sea único
    if (payload.email && payload.email !== existingEstudiante.email) {
      const estudianteWithEmail = await this.repo.findByEmail(payload.email);
      if (estudianteWithEmail) {
        throw new Error('Ya existe un estudiante con este email');
      }
    }

    // Validar que la nueva facultad exista si se está cambiando
    if (payload.facultadId && payload.facultadId !== existingEstudiante.facultadId) {
      const facultad = await this.facultadRepo.findById(payload.facultadId);
      if (!facultad) {
        throw new Error('La facultad especificada no existe');
      }
    }

    // Validar que el nuevo país exista si se está cambiando
    if (payload.paisId && payload.paisId !== existingEstudiante.paisId) {
      const pais = await this.paisRepo.findById(payload.paisId);
      if (!pais) {
        throw new Error('El país especificado no existe');
      }
    }

    return this.repo.update(id, payload);
  }

  async delete(id: number): Promise<boolean> {
    const existingEstudiante = await this.repo.findById(id);
    if (!existingEstudiante) {
      return false;
    }

    return this.repo.delete(id);
  }

  async deactivate(id: number): Promise<Estudiante | null> {
    return this.repo.update(id, { activo: false });
  }

  async activate(id: number): Promise<Estudiante | null> {
    return this.repo.update(id, { activo: true });
  }
}