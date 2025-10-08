export interface Profesor {
  id: number;
  nombre: string;
  correo: string;
  telefono?: string;
  paisId?: number;
  activo: boolean;
}