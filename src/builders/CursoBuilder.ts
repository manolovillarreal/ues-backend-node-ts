import type { Curso } from '../models/Curso.js';
import type { CreateCursoDto, UpdateCursoDto } from '../dtos/curso/index.js';

export class CursoBuilder {
  private curso: Partial<Curso> = {};

  // Método estático para crear desde DTO
  static fromCreateDto(dto: CreateCursoDto): CursoBuilder {
    return new CursoBuilder()
      .setNombre(dto.nombre)
      .setCodigo(dto.codigo)
      .setFacultadId(dto.facultadId)
      .setProfesorId(dto.profesorId)
      .setActivo(dto.activo ?? true); // Valor por defecto del dominio
  }

  // Método estático para crear desde DTO de actualización
  static fromUpdateDto(current: Curso, dto: UpdateCursoDto): CursoBuilder {
    return new CursoBuilder()
      .setId(current.id)
      .setNombre(dto.nombre !== undefined ? dto.nombre : current.nombre)
      .setCodigo(dto.codigo !== undefined ? dto.codigo : current.codigo)
      .setFacultadId(dto.facultadId !== undefined ? dto.facultadId : current.facultadId)
      .setProfesorId(dto.profesorId !== undefined ? dto.profesorId : current.profesorId)
      .setActivo(dto.activo !== undefined ? dto.activo : current.activo);
  }

  setId(id: number): CursoBuilder {
    this.curso.id = id;
    return this;
  }

  setNombre(nombre: string): CursoBuilder {
    this.curso.nombre = nombre;
    return this;
  }

  setCodigo(codigo: string): CursoBuilder {
    this.curso.codigo = codigo;
    return this;
  }

  setFacultadId(facultadId: number): CursoBuilder {
    this.curso.facultadId = facultadId;
    return this;
  }

  setProfesorId(profesorId: number): CursoBuilder {
    this.curso.profesorId = profesorId;
    return this;
  }

  setActivo(activo: boolean): CursoBuilder {
    this.curso.activo = activo;
    return this;
  }

  build(): Curso {
    // Validaciones antes de construir
    if (!this.curso.id || 
        !this.curso.nombre || 
        !this.curso.codigo || 
        !this.curso.facultadId || 
        !this.curso.profesorId || 
        this.curso.activo === undefined) {
      throw new Error('Faltan campos requeridos para construir el Curso');
    }

    return {
      id: this.curso.id,
      nombre: this.curso.nombre,
      codigo: this.curso.codigo,
      facultadId: this.curso.facultadId,
      profesorId: this.curso.profesorId,
      activo: this.curso.activo
    };
  }
}