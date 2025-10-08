import type { Profesor } from '../models/Profesor.js';
import type { CreateProfesorDto, UpdateProfesorDto } from '../dtos/profesor/index.js';

export class ProfesorBuilder {
  private profesor: Partial<Profesor> = {};

  // Método estático para crear desde DTO
  static fromCreateDto(dto: CreateProfesorDto): ProfesorBuilder {
    return new ProfesorBuilder()
      .setNombre(dto.nombre)
      .setCorreo(dto.correo)
      .setActivo(dto.activo ?? true) // Valor por defecto del dominio
      .setTelefono(dto.telefono)
      .setPaisId(dto.paisId);
  }

  // Método estático para crear desde DTO de actualización
  static fromUpdateDto(current: Profesor, dto: UpdateProfesorDto): ProfesorBuilder {
    return new ProfesorBuilder()
      .setId(current.id)
      .setNombre(dto.nombre !== undefined ? dto.nombre : current.nombre)
      .setCorreo(dto.correo !== undefined ? dto.correo : current.correo)
      .setActivo(dto.activo !== undefined ? dto.activo : current.activo)
      .setTelefono(dto.telefono !== undefined ? dto.telefono : current.telefono)
      .setPaisId(dto.paisId !== undefined ? dto.paisId : current.paisId);
  }

  setId(id: number): ProfesorBuilder {
    this.profesor.id = id;
    return this;
  }

  setNombre(nombre: string): ProfesorBuilder {
    this.profesor.nombre = nombre;
    return this;
  }

  setCorreo(correo: string): ProfesorBuilder {
    this.profesor.correo = correo;
    return this;
  }

  setTelefono(telefono?: string): ProfesorBuilder {
    if (telefono) {
      this.profesor.telefono = telefono;
    }
    return this;
  }

  setPaisId(paisId?: number): ProfesorBuilder {
    if (paisId) {
      this.profesor.paisId = paisId;
    }
    return this;
  }

  setActivo(activo: boolean): ProfesorBuilder {
    this.profesor.activo = activo;
    return this;
  }

  build(): Profesor {
    // Validaciones antes de construir
    if (!this.profesor.id || !this.profesor.nombre || !this.profesor.correo || this.profesor.activo === undefined) {
      throw new Error('Faltan campos requeridos para construir el Profesor');
    }

    return {
      id: this.profesor.id,
      nombre: this.profesor.nombre,
      correo: this.profesor.correo,
      activo: this.profesor.activo,
      ...(this.profesor.telefono && { telefono: this.profesor.telefono }),
      ...(this.profesor.paisId && { paisId: this.profesor.paisId })
    };
  }
}