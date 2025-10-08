import type { Proyecto } from '../models/Proyecto.js';
import type { AsignarProyectoDto } from '../dtos/proyecto/index.js';

export class ProyectoBuilder {
  private proyecto: Partial<Proyecto> = {};

  static new(): ProyectoBuilder {
    return new ProyectoBuilder();
  }

  /**
   * Construye un proyecto para asignación desde el DTO
   * Solo almacena los campos esenciales del dominio local
   */
  static fromAsignarDto(dto: AsignarProyectoDto): ProyectoBuilder {
    return new ProyectoBuilder()
      .withId(dto.id)
      .withCursoId(dto.cursoId)
      .withFechaAsignacion(new Date());
  }

  withId(id: number): ProyectoBuilder {
    this.proyecto.id = id;
    return this;
  }

  withCursoId(cursoId: number): ProyectoBuilder {
    this.proyecto.cursoId = cursoId;
    return this;
  }

  withFechaAsignacion(fechaAsignacion: Date): ProyectoBuilder {
    this.proyecto.fechaAsignacion = fechaAsignacion;
    return this;
  }

  /**
   * Métodos opcionales para datos del dominio externo (solo para presentación)
   */
  withNombre(nombre: string): ProyectoBuilder {
    this.proyecto.nombre = nombre;
    return this;
  }

  withDescripcion(descripcion: string): ProyectoBuilder {
    this.proyecto.descripcion = descripcion;
    return this;
  }

  withFechaInicio(fechaInicio: Date): ProyectoBuilder {
    this.proyecto.fechaInicio = fechaInicio;
    return this;
  }

  withFechaFinalizacion(fechaFinalizacion: Date): ProyectoBuilder {
    this.proyecto.fechaFinalizacion = fechaFinalizacion;
    return this;
  }

  withEstado(estado: string): ProyectoBuilder {
    this.proyecto.estado = estado;
    return this;
  }

  build(): Proyecto {
    // Validaciones para campos requeridos del dominio local
    if (this.proyecto.id === undefined) {
      throw new Error('ID del proyecto es requerido');
    }
    if (this.proyecto.cursoId === undefined) {
      throw new Error('ID del curso es requerido');
    }
    if (!this.proyecto.fechaAsignacion) {
      throw new Error('Fecha de asignación es requerida');
    }

    return this.proyecto as Proyecto;
  }
}