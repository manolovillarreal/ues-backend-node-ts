// Interfaz para validaciones que pueden ser implementadas por otros dominios
export interface IValidacionProyectoProfesorService {
  
  /**
   * Valida si un profesor puede manejar un proyecto adicional
   * basado en su carga actual de trabajo, asumiento que un curso asignado
   * con un proyecto asignado representa un proyecto asignado al profesor.
   */
  validarCargaTrabajo(profesorId: number): Promise<void>;
}