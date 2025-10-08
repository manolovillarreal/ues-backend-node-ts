import type { Pais } from '../models/Pais.js';
import type { CreatePaisDto, UpdatePaisDto } from '../dtos/pais/index.js';

export class PaisBuilder {
  private pais: Partial<Pais> = {};

  // Método estático para crear desde DTO
  static fromCreateDto(dto: CreatePaisDto): PaisBuilder {
    return new PaisBuilder()
      .setNombre(dto.nombre);
  }

  // Método estático para crear desde DTO de actualización
  static fromUpdateDto(current: Pais, dto: UpdatePaisDto): PaisBuilder {
    return new PaisBuilder()
      .setId(current.id)
      .setNombre(dto.nombre !== undefined ? dto.nombre : current.nombre);
  }

  setId(id: number): PaisBuilder {
    this.pais.id = id;
    return this;
  }

  setNombre(nombre: string): PaisBuilder {
    this.pais.nombre = nombre;
    return this;
  }

  build(): Pais {
    // Validaciones antes de construir
    if (!this.pais.id || !this.pais.nombre) {
      throw new Error('Faltan campos requeridos para construir el Pais');
    }

    return {
      id: this.pais.id,
      nombre: this.pais.nombre
    };
  }
}