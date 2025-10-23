import type { NotificacionProfesorDto } from "../dtos/curso/NotificacionProfesor.dto.js";


export function notificarProfesorAsignado(event:NotificacionProfesorDto) {
  const { curso, profesor, profesorRetirado } = event;
  console.log(
    `Notificación: el profesor ${profesor.nombre} fue asignado al curso ${curso.nombre}.`
  );

  if (profesorRetirado) {
    console.log(
      `Notificación adicional: el profesor ${profesorRetirado.nombre} fue retirado del curso ${curso.nombre}.`
    );
  }
}