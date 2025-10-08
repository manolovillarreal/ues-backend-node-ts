import type { Curso } from '../../models/Curso.js';
import type { Estudiante } from '../../models/Estudiante.js';
import type { CursoEstudiante } from '../../models/CursoEstudiante.js';
import type { ICursoRepository } from '../ICursoRepository.js';
import type { CreateCursoDto,UpdateCursoDto } from '../../dtos/curso/index.js';
import { CursoBuilder } from '../../builders/CursoBuilder.js';
import type { IEstudianteRepository } from '../IEstudianteRepository.js';
import { EstudianteRepositoryInMemory } from './EstudianteRepositoryInMemory.js';
import { cursos as cursosMock, cursoEstudiantes as cursoEstudiantesMock } from '../../db/inMemory/index.js';

export class CursoRepositoryInMemory implements ICursoRepository {
  private cursos: Curso[] = [];
  private cursoEstudiantes: CursoEstudiante[] = [];
  private nextId = 1;
  private estudianteRepo: IEstudianteRepository;

  constructor(estudianteRepo?: IEstudianteRepository) {
    this.estudianteRepo = estudianteRepo ?? new EstudianteRepositoryInMemory();
    this.loadMockData();
  }

  private loadMockData(): void {
    // Cargar cursos
    this.cursos = [...cursosMock];
    
    // Cargar relaciones curso-estudiante con conversión de fechas
    this.cursoEstudiantes = cursoEstudiantesMock.map(ce => ({
      ...ce,
      fechaInscripcion: new Date(ce.fechaInscripcion)
    }));
    
    // Configurar nextId basado en los datos existentes
    this.nextId = this.cursos.length > 0 ? Math.max(...this.cursos.map(c => c.id)) + 1 : 1;
  }

  async create(curso: CreateCursoDto): Promise<Curso> {
    // ✨ Builder Pattern aplicado
    const newCurso = CursoBuilder
      .fromCreateDto(curso)
      .setId(this.nextId++) // El repositorio maneja la generación de ID
      .build();
    
    this.cursos.push(newCurso);
    return newCurso;
  }

  async findAll(): Promise<Curso[]> {
    return [...this.cursos];
  }

  async findById(id: number): Promise<Curso | null> {
    return this.cursos.find(c => c.id === id) || null;
  }

  async findByCodigo(codigo: string): Promise<Curso | null> {
    return this.cursos.find(c => c.codigo.toLowerCase() === codigo.toLowerCase()) || null;
  }

  async findByFacultadId(facultadId: number): Promise<Curso[]> {
    return this.cursos.filter(c => c.facultadId === facultadId);
  }

  async findByProfesorId(profesorId: number): Promise<Curso[]> {
    return this.cursos.filter(c => c.profesorId === profesorId);
  }

  async update(id: number, curso: UpdateCursoDto): Promise<Curso | null> {
    const index = this.cursos.findIndex(c => c.id === id);
    if (index === -1) {
      return null;
    }
    
    const current = this.cursos[index]!;
    
    // ✨ Builder Pattern aplicado para update
    const updatedCurso = CursoBuilder
      .fromUpdateDto(current, curso)
      .build();
    
    this.cursos[index] = updatedCurso;
    return updatedCurso;
  }

  async delete(id: number): Promise<boolean> {
    const index = this.cursos.findIndex(c => c.id === id);
    if (index === -1) {
      return false;
    }
    
    // Eliminar también las inscripciones de estudiantes
    this.cursoEstudiantes = this.cursoEstudiantes.filter(ce => ce.cursoId !== id);
    
    this.cursos.splice(index, 1);
    return true;
  }

  // Relación ManyToMany con Estudiantes
  async inscribirEstudiante(cursoId: number, estudianteId: number): Promise<CursoEstudiante> {
    const cursoEstudiante: CursoEstudiante = {
      cursoId,
      estudianteId,
      fechaInscripcion: new Date(),
      activo: true
    };
    
    this.cursoEstudiantes.push(cursoEstudiante);
    return cursoEstudiante;
  }

  async desinscribirEstudiante(cursoId: number, estudianteId: number): Promise<boolean> {
    const index = this.cursoEstudiantes.findIndex(
      ce => ce.cursoId === cursoId && ce.estudianteId === estudianteId
    );
    
    if (index === -1) {
      return false;
    }
    
    this.cursoEstudiantes.splice(index, 1);
    return true;
  }

  async getEstudiantesByCurso(cursoId: number): Promise<Estudiante[]> {
    const estudianteIds = this.cursoEstudiantes
      .filter(ce => ce.cursoId === cursoId && ce.activo)
      .map(ce => ce.estudianteId);
    
    const estudiantes: Estudiante[] = [];
    for (const estudianteId of estudianteIds) {
      const estudiante = await this.estudianteRepo.findById(estudianteId);
      if (estudiante) {
        estudiantes.push(estudiante);
      }
    }
    
    return estudiantes;
  }

  async getCursosByEstudiante(estudianteId: number): Promise<Curso[]> {
    const cursoIds = this.cursoEstudiantes
      .filter(ce => ce.estudianteId === estudianteId && ce.activo)
      .map(ce => ce.cursoId);
    
    return this.cursos.filter(c => cursoIds.includes(c.id));
  }

  async isEstudianteInscrito(cursoId: number, estudianteId: number): Promise<boolean> {
    return this.cursoEstudiantes.some(
      ce => ce.cursoId === cursoId && ce.estudianteId === estudianteId && ce.activo
    );
  }
}