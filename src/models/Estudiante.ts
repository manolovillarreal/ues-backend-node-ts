export interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  facultadId: number;
  paisId: number;
  fechaIngreso: Date;
  activo: boolean;
}