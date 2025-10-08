export interface Proyecto {
  id: number;
  cursoId: number;
  // Campos que vienen del dominio externo
  nombre?: string;
  descripcion?: string;
  fechaInicio?: Date;
  fechaFinalizacion?: Date;
  estado?: string;
  // Metadatos de integración
  fechaAsignacion: Date;
}