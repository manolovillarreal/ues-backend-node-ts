import type { Curso } from '../models/Curso.js';
import type { Estudiante } from '../models/Estudiante.js';
import type { CursoEstudiante } from '../models/CursoEstudiante.js';
import type { ICursoRepository } from '../repositories/ICursoRepository.js';
import { CursoRepositoryInMemory } from '../repositories/in-memory/CursoRepositoryInMemory.js';
import type { CreateCursoDto, UpdateCursoDto } from '../dtos/curso/index.js';
import type { IFacultadRepository } from '../repositories/IFacultadRepository.js';
import { FacultadRepositoryInMemory } from '../repositories/in-memory/FacultadRepositoryInMemory.js';
import type { IProfesorRepository } from '../repositories/IProfesorRepository.js';
import { ProfesorRepositoryInMemory } from '../repositories/in-memory/ProfesorRepositoryInMemory.js';
import type { IEstudianteRepository } from '../repositories/IEstudianteRepository.js';
import { EstudianteRepositoryInMemory } from '../repositories/in-memory/EstudianteRepositoryInMemory.js';

export class CursoService {
  private repo: ICursoRepository;
  private facultadRepo: IFacultadRepository;
  private profesorRepo: IProfesorRepository;
  private estudianteRepo: IEstudianteRepository;

  constructor(
    repo?: ICursoRepository,
    facultadRepo?: IFacultadRepository,
    profesorRepo?: IProfesorRepository,
    estudianteRepo?: IEstudianteRepository
  ) {
    this.estudianteRepo = estudianteRepo ?? new EstudianteRepositoryInMemory();
    this.repo = repo ?? new CursoRepositoryInMemory(this.estudianteRepo);
    this.facultadRepo = facultadRepo ?? new FacultadRepositoryInMemory();
    this.profesorRepo = profesorRepo ?? new ProfesorRepositoryInMemory();
  }

  async create(payload: CreateCursoDto): Promise<Curso> {
    // Validar que el código sea único
    const existingCurso = await this.repo.findByCodigo(payload.codigo);
    if (existingCurso) {
      throw new Error('Ya existe un curso con este código');
    }

    // Validar que la facultad exista (relación ManyToOne)
    const facultad = await this.facultadRepo.findById(payload.facultadId);
    if (!facultad) {
      throw new Error('La facultad especificada no existe');
    }

    // Validar que el profesor exista (relación ManyToOne)
    const profesor = await this.profesorRepo.findById(payload.profesorId);
    if (!profesor) {
      throw new Error('El profesor especificado no existe');
    }

    // Validar que el profesor esté activo
    if (!profesor.activo) {
      throw new Error('El profesor especificado no está activo');
    }

    return this.repo.create(payload);
  }

  async findAll(): Promise<Curso[]> {
    return this.repo.findAll();
  }

  async findById(id: number): Promise<Curso | null> {
    return this.repo.findById(id);
  }

  async findByFacultadId(facultadId: number): Promise<Curso[]> {
    return this.repo.findByFacultadId(facultadId);
  }

  async findByProfesorId(profesorId: number): Promise<Curso[]> {
    return this.repo.findByProfesorId(profesorId);
  }

  async update(id: number, payload: UpdateCursoDto): Promise<Curso | null> {
    // Verificar que el curso exista
    const existingCurso = await this.repo.findById(id);
    if (!existingCurso) {
      return null;
    }

    // Si se está actualizando el código, verificar que sea único
    if (payload.codigo && payload.codigo !== existingCurso.codigo) {
      const cursoWithCode = await this.repo.findByCodigo(payload.codigo);
      if (cursoWithCode) {
        throw new Error('Ya existe un curso con este código');
      }
    }

    // Validar que la nueva facultad exista si se está cambiando
    if (payload.facultadId && payload.facultadId !== existingCurso.facultadId) {
      const facultad = await this.facultadRepo.findById(payload.facultadId);
      if (!facultad) {
        throw new Error('La facultad especificada no existe');
      }
    }

    // Validar que el nuevo profesor exista si se está cambiando
    if (payload.profesorId && payload.profesorId !== existingCurso.profesorId) {
      const profesor = await this.profesorRepo.findById(payload.profesorId);
      if (!profesor) {
        throw new Error('El profesor especificado no existe');
      }
      if (!profesor.activo) {
        throw new Error('El profesor especificado no está activo');
      }
    }

    return this.repo.update(id, payload);
  }

  async delete(id: number): Promise<boolean> {
    const existingCurso = await this.repo.findById(id);
    if (!existingCurso) {
      return false;
    }

    return this.repo.delete(id);
  }

  // Métodos para relación ManyToMany con Estudiantes
  async inscribirEstudiante(cursoId: number, estudianteId: number): Promise<CursoEstudiante> {
    // Validar que el curso exista
    const curso = await this.repo.findById(cursoId);
    if (!curso) {
      throw new Error('El curso especificado no existe');
    }

    // Validar que el curso esté activo
    if (!curso.activo) {
      throw new Error('El curso no está activo');
    }

    // Validar que el estudiante exista
    const estudiante = await this.estudianteRepo.findById(estudianteId);
    if (!estudiante) {
      throw new Error('El estudiante especificado no existe');
    }

    // Validar que el estudiante esté activo
    if (!estudiante.activo) {
      throw new Error('El estudiante no está activo');
    }

    // Validar que el estudiante no esté ya inscrito
    const yaInscrito = await this.repo.isEstudianteInscrito(cursoId, estudianteId);
    if (yaInscrito) {
      throw new Error('El estudiante ya está inscrito en este curso');
    }

    return this.repo.inscribirEstudiante(cursoId, estudianteId);
  }

  async desinscribirEstudiante(cursoId: number, estudianteId: number): Promise<boolean> {
    // Validar que el estudiante esté inscrito
    const inscrito = await this.repo.isEstudianteInscrito(cursoId, estudianteId);
    if (!inscrito) {
      throw new Error('El estudiante no está inscrito en este curso');
    }

    return this.repo.desinscribirEstudiante(cursoId, estudianteId);
  }

  async getEstudiantesByCurso(cursoId: number): Promise<Estudiante[]> {
    // Validar que el curso exista
    const curso = await this.repo.findById(cursoId);
    if (!curso) {
      throw new Error('El curso especificado no existe');
    }

    return this.repo.getEstudiantesByCurso(cursoId);
  }

  async getCursosByEstudiante(estudianteId: number): Promise<Curso[]> {
    // Validar que el estudiante exista
    const estudiante = await this.estudianteRepo.findById(estudianteId);
    if (!estudiante) {
      throw new Error('El estudiante especificado no existe');
    }

    return this.repo.getCursosByEstudiante(estudianteId);
  }

  async deactivate(id: number): Promise<Curso | null> {
    return this.repo.update(id, { activo: false });
  }

  async activate(id: number): Promise<Curso | null> {
    return this.repo.update(id, { activo: true });
  }
}