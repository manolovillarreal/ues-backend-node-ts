import type { Estudiante } from '../models/Estudiante.js';
import type { CreateEstudianteDto, UpdateEstudianteDto } from '../dtos/estudiante/index.js';

export class EstudianteBuilder {
  private estudiante: Partial<Estudiante> = {};

  // Método estático para crear desde DTO
  static fromCreateDto(dto: CreateEstudianteDto): EstudianteBuilder {
    return new EstudianteBuilder()
      .setNombre(dto.nombre)
      .setEmail(dto.email)
      .setFacultadId(dto.facultadId)
      .setFechaIngreso(new Date(dto.fechaIngreso))
      .setActivo(dto.activo ?? true) // Valor por defecto del dominio
      .setPaisId(dto.paisId);
  }

  // Método estático para crear desde DTO de actualización
  static fromUpdateDto(current: Estudiante, dto: UpdateEstudianteDto): EstudianteBuilder {
    return new EstudianteBuilder()
      .setId(current.id)
      .setNombre(dto.nombre !== undefined ? dto.nombre : current.nombre)
      .setEmail(dto.email !== undefined ? dto.email : current.email)
      .setFacultadId(dto.facultadId !== undefined ? dto.facultadId : current.facultadId)
      .setFechaIngreso(dto.fechaIngreso !== undefined ? new Date(dto.fechaIngreso) : current.fechaIngreso)
      .setActivo(dto.activo !== undefined ? dto.activo : current.activo)
      .setPaisId(dto.paisId !== undefined ? dto.paisId : current.paisId);
  }

  setId(id: number): EstudianteBuilder {
    this.estudiante.id = id;
    return this;
  }

  setNombre(nombre: string): EstudianteBuilder {
    this.estudiante.nombre = nombre;
    return this;
  }

  setEmail(email: string): EstudianteBuilder {
    this.estudiante.email = email;
    return this;
  }

  setFacultadId(facultadId: number): EstudianteBuilder {
    this.estudiante.facultadId = facultadId;
    return this;
  }

  setPaisId(paisId?: number): EstudianteBuilder {
    if (paisId) {
      this.estudiante.paisId = paisId;
    }
    return this;
  }

  setFechaIngreso(fechaIngreso: Date): EstudianteBuilder {
    this.estudiante.fechaIngreso = fechaIngreso;
    return this;
  }

  setActivo(activo: boolean): EstudianteBuilder {
    this.estudiante.activo = activo;
    return this;
  }

  build(): Estudiante {
    // Validaciones antes de construir
    if (!this.estudiante.id || 
        !this.estudiante.nombre || 
        !this.estudiante.email || 
        !this.estudiante.facultadId || 
        !this.estudiante.fechaIngreso ||
        !this.estudiante.paisId ||
        this.estudiante.activo === undefined) {
      throw new Error('Faltan campos requeridos para construir el Estudiante');
    }

    return {
      id: this.estudiante.id,
      nombre: this.estudiante.nombre,
      email: this.estudiante.email,
      facultadId: this.estudiante.facultadId,
      fechaIngreso: this.estudiante.fechaIngreso,
      activo: this.estudiante.activo,
      paisId: this.estudiante.paisId
    };
  }
}