import type { Facultad } from '../models/Facultad.js';
import type { CreateFacultadDto,UpdateFacultadDto } from '../dtos/facultad/index.js';

export class FacultadBuilder {
  private facultad: Partial<Facultad> = {};

  // Método estático para crear desde DTO
  static fromCreateDto(dto: CreateFacultadDto): FacultadBuilder {
    return new FacultadBuilder()
      .setNombre(dto.nombre)
      .setCodigo(dto.codigo);
  }

  // Método estático para crear desde DTO de actualización
  static fromUpdateDto(current: Facultad, dto: UpdateFacultadDto): FacultadBuilder {
    return new FacultadBuilder()
      .setId(current.id)
      .setNombre(dto.nombre !== undefined ? dto.nombre : current.nombre)
      .setCodigo(dto.codigo !== undefined ? dto.codigo : current.codigo);
  }

  setId(id: number): FacultadBuilder {
    this.facultad.id = id;
    return this;
  }

  setNombre(nombre: string): FacultadBuilder {
    this.facultad.nombre = nombre;
    return this;
  }

  setCodigo(codigo?: string): FacultadBuilder {
    if (codigo) {
      this.facultad.codigo = codigo;
    }
    return this;
  }

  build(): Facultad {
    // Validaciones antes de construir
    if (!this.facultad.id || !this.facultad.nombre) {
      throw new Error('Faltan campos requeridos para construir la Facultad');
    }

    return {
      id: this.facultad.id,
      nombre: this.facultad.nombre,
      ...(this.facultad.codigo && { codigo: this.facultad.codigo })
    };
  }
}