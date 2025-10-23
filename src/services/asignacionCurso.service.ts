// services/AsignacionCursoService.ts

import e from "express";
import type { AsignacionProfesorDto } from "../dtos/curso/AsignacionProfesor.dto.js";
import type { NotificacionProfesorDto } from "../dtos/curso/NotificacionProfesor.dto.js";
import { Observable } from "../models/Observable.js";
import type { ICursoRepository } from "../repositories/ICursoRepository.js";
import { CursoRepositoryInMemory } from "../repositories/in-memory/CursoRepositoryInMemory.js";
import  { ProfesorRepositoryInMemory } from "../repositories/in-memory/ProfesorRepositoryInMemory.js";
import type { IProfesorRepository } from "../repositories/IProfesorRepository.js";



export class AsignacionCursoService extends Observable<NotificacionProfesorDto> {
  private cursoRepo: ICursoRepository;
  private profesorRepo: IProfesorRepository;
  constructor(cursoRepo?: ICursoRepository, profesorRepo?: IProfesorRepository) {
    super();
    this.cursoRepo = cursoRepo ?? new CursoRepositoryInMemory();
    this.profesorRepo = profesorRepo ?? new ProfesorRepositoryInMemory();
  }

  async asignarCurso(payload: AsignacionProfesorDto): Promise<void> {
   // Validar que el curso exista
    const existingCurso = await this.cursoRepo.findById(payload.cursoId);
    if (!existingCurso) {
      throw new Error('El curso especificado no existe');
    }
   // Validar que el profesor exista 
       const profesor = await this.profesorRepo.findById(payload.profesorId);
       if (!profesor) {
         throw new Error('El profesor especificado no existe');
       }   
       // Validar que el profesor esté activo
       if (!profesor.activo) {
         throw new Error('El profesor especificado no está activo');
       }

    const profesorActual =  await this.profesorRepo.findById(existingCurso.profesorId!);
    
    console.log(`Curso ${payload.cursoId} asignado al profesor ${payload.profesorId}.`);
    this.cursoRepo.asignarProfesor(payload.cursoId, payload.profesorId);

      const profesorRetirado = (profesorActual && profesorActual.id !== profesor.id) 
    ? profesorActual 
    : undefined;

    this.notificar({
      curso: existingCurso,
      profesor: profesor,
      profesorRetirado,
    });
  }
}

