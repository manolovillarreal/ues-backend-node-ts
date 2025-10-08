import type { EstudianteProyecto } from '../models/EstudianteProyecto.js';
import type { CreateEstudianteProyectoDto, UpdateEstudianteProyectoDto } from '../dtos/estudiante-proyecto/index.js';

export class EstudianteProyectoBuilder {
  private estudianteProyecto: Partial<EstudianteProyecto> = {};

  static new(): EstudianteProyectoBuilder {
    return new EstudianteProyectoBuilder();
  }

  static fromCreateDto(dto: CreateEstudianteProyectoDto): EstudianteProyectoBuilder {
    return new EstudianteProyectoBuilder()
      .withProyectoId(dto.proyectoId)
      .withEstudianteId(dto.estudianteId)
      .withCalificacion(dto.calificacion)
      .withActivo(dto.activo ?? true);
  }

  static fromUpdateDto(current: EstudianteProyecto, dto: UpdateEstudianteProyectoDto): EstudianteProyectoBuilder {
    return new EstudianteProyectoBuilder()
      .withCalificacion(dto.calificacion !== undefined ? dto.calificacion : current.calificacion)
      .withActivo(dto.activo !== undefined ? dto.activo : current.activo);
  }

  withProyectoId(proyectoId: number): EstudianteProyectoBuilder {
    this.estudianteProyecto.proyectoId = proyectoId;
    return this;
  }

  withEstudianteId(estudianteId: number): EstudianteProyectoBuilder {
    this.estudianteProyecto.estudianteId = estudianteId;
    return this;
  }

  withCalificacion(calificacion: number): EstudianteProyectoBuilder {
    this.estudianteProyecto.calificacion = calificacion;
    return this;
  }

  withActivo(activo: boolean): EstudianteProyectoBuilder {
    this.estudianteProyecto.activo = activo;
    return this;
  }

  build(): EstudianteProyecto {
    if (this.estudianteProyecto.proyectoId === undefined) {
      throw new Error('ProyectoId es requerido');
    }
    if (this.estudianteProyecto.estudianteId === undefined) {
      throw new Error('EstudianteId es requerido');
    }
    if (this.estudianteProyecto.calificacion === undefined) {
      throw new Error('Calificación es requerida');
    }
    if (this.estudianteProyecto.activo === undefined) {
      throw new Error('Estado activo es requerido');
    }

    return this.estudianteProyecto as EstudianteProyecto;
  }
}