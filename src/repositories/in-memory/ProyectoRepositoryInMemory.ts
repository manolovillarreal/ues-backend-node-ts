import type { Proyecto } from '../../models/Proyecto.js';
import type { IProyectoRepository } from '../IProyectoRepository.js';
import type { AsignarProyectoDto } from '../../dtos/proyecto/index.js';
import { ProyectoBuilder } from '../../builders/ProyectoBuilder.js';
import { proyectos as proyectosMock } from '../../db/inMemory/index.js';

export class ProyectoRepositoryInMemory implements IProyectoRepository {
  private proyectos: Proyecto[] = [];
  private nextId = 1;

  constructor() {
    this.loadMockData();
  }

  private loadMockData(): void {
    // Cargar proyectos con conversión de fechas
    this.proyectos = proyectosMock.map(mock => {
      const proyecto: Proyecto = {
        id: mock.id,
        cursoId: mock.cursoId,
        fechaAsignacion: new Date(mock.fechaAsignacion)
      };
      
      if (mock.nombre) proyecto.nombre = mock.nombre;
      if (mock.descripcion) proyecto.descripcion = mock.descripcion;
      if (mock.fechaInicio) proyecto.fechaInicio = new Date(mock.fechaInicio);
      if (mock.fechaFinalizacion) proyecto.fechaFinalizacion = new Date(mock.fechaFinalizacion);
      if (mock.estado) proyecto.estado = mock.estado;
      
      return proyecto;
    });
    
    // Configurar nextId basado en los datos existentes
    this.nextId = this.proyectos.length > 0 ? Math.max(...this.proyectos.map(p => p.id)) + 1 : 1;
  }

  async findAll(): Promise<Proyecto[]> {
    return [...this.proyectos];
  }

  async findById(id: number): Promise<Proyecto | null> {
    return this.proyectos.find(p => p.id === id) || null;
  }

  async findByCursoId(cursoId: number): Promise<Proyecto[]> {
    return this.proyectos.filter(p => p.cursoId === cursoId);
  }

  async delete(id: number): Promise<boolean> {
    const index = this.proyectos.findIndex(p => p.id === id);
    if (index === -1) {
      return false;
    }
    
    this.proyectos.splice(index, 1);
    return true;
  }

  async findProyectosActivosByCurso(cursoId: number): Promise<Proyecto[]> {
    return this.proyectos.filter(p => p.cursoId === cursoId);
  }

  async asignarProyectoACurso(asignarProyectoDto: AsignarProyectoDto): Promise<Proyecto> {
    // Usar el builder para construir el proyecto con solo los campos del dominio local
    const proyecto = ProyectoBuilder
      .fromAsignarDto(asignarProyectoDto)
      .build();
    
    this.proyectos.push(proyecto);
    
    return proyecto;
  }

  async desasignarProyectoDeCurso(proyectoId: number): Promise<boolean> {
    const index = this.proyectos.findIndex(p => p.id === proyectoId);
    if (index === -1) {
      return false;
    }
    
    // Marcar como inactivo en lugar de eliminar
    this.proyectos.splice(index, 1);
    return true;
  }


}