export interface IValidacionAsignacionProyectoService {
  /**
   * Valida las precondiciones básicas para asignar un proyecto a un curso
   * @param cursoId ID del curso al que se quiere asignar el proyecto
   * @param proyectoId ID del proyecto que se quiere asignar
   */
  validarPrecondicionesAsignacion(cursoId: number, proyectoId: number): Promise<void>;
}