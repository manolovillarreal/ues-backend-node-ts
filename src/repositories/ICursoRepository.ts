import type { Curso } from '../models/Curso.js';
import type { Estudiante } from '../models/Estudiante.js';
import type { CursoEstudiante } from '../models/CursoEstudiante.js';
import type { CreateCursoDto, UpdateCursoDto, InscribirEstudianteCursoDto } from '../dtos/curso/index.js';

export interface ICursoRepository {
  // CRUD básico
  create(curso: CreateCursoDto): Promise<Curso>;
  findAll(): Promise<Curso[]>;
  findById(id: number): Promise<Curso | null>;
  findByCodigo(codigo: string): Promise<Curso | null>;
  findByFacultadId(facultadId: number): Promise<Curso[]>;
  findByProfesorId(profesorId: number): Promise<Curso[]>;
  update(id: number, curso: UpdateCursoDto): Promise<Curso | null>;
  delete(id: number): Promise<boolean>;

  // Relación ManyToMany con Estudiantes
  inscribirEstudiante(cursoId: number, estudianteId: number): Promise<CursoEstudiante>;
  desinscribirEstudiante(cursoId: number, estudianteId: number): Promise<boolean>;
  getEstudiantesByCurso(cursoId: number): Promise<Estudiante[]>;
  getCursosByEstudiante(estudianteId: number): Promise<Curso[]>;
  isEstudianteInscrito(cursoId: number, estudianteId: number): Promise<boolean>;
}