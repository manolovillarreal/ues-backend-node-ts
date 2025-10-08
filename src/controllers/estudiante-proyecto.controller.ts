import type { Request, Response } from 'express';
import type { RespuestaAPI } from '../models/RespuestaAPI.js';
import type { EstudianteProyecto } from '../models/EstudianteProyecto.js';
import type { CreateEstudianteProyectoDto, UpdateEstudianteProyectoDto } from '../dtos/estudiante-proyecto/index.js';
import { EstudianteProyectoService } from '../services/estudiante-proyecto.service.js';

export class EstudianteProyectoController {
  private readonly service = new EstudianteProyectoService();

  // POST /api/proyectos/:proyectoId/estudiantes - Asignar estudiante a proyecto
  asignarEstudiante = async (req: Request, res: Response): Promise<void> => {
    try {
      const proyectoId = Number(req.params.proyectoId);
      const { estudianteId, calificacion = 0, activo = true } = req.body as CreateEstudianteProyectoDto;

      if (isNaN(proyectoId)) {
        const response: RespuestaAPI<null> = {
          ok: false,
          message: 'ID de proyecto inválido'
        };
        res.status(400).json(response);
        return;
      }

      const createDto: CreateEstudianteProyectoDto = {
        proyectoId,
        estudianteId,
        calificacion,
        activo
      };

      const estudianteProyecto = await this.service.create(createDto);
      
      const response: RespuestaAPI<EstudianteProyecto> = {
        ok: true,
        message: 'Estudiante asignado al proyecto exitosamente',
        data: estudianteProyecto
      };
      
      res.status(201).json(response);
    } catch (error) {
      const response: RespuestaAPI<null> = {
        ok: false,
        message: error instanceof Error ? error.message : 'Error interno del servidor'
      };
      res.status(400).json(response);
    }
  };

  // DELETE /api/proyectos/:proyectoId/estudiantes/:estudianteId - Desasignar estudiante del proyecto
  desasignarEstudiante = async (req: Request, res: Response): Promise<void> => {
    try {
      const proyectoId = Number(req.params.proyectoId);
      const estudianteId = Number(req.params.estudianteId);

      if (isNaN(proyectoId) || isNaN(estudianteId)) {
        const response: RespuestaAPI<null> = {
          ok: false,
          message: 'IDs inválidos'
        };
        res.status(400).json(response);
        return;
      }

      const deleted = await this.service.delete(proyectoId, estudianteId);
      
      if (!deleted) {
        const response: RespuestaAPI<null> = {
          ok: false,
          message: 'Relación estudiante-proyecto no encontrada'
        };
        res.status(404).json(response);
        return;
      }

      const response: RespuestaAPI<null> = {
        ok: true,
        message: 'Estudiante desasignado del proyecto exitosamente'
      };
      
      res.status(200).json(response);
    } catch (error) {
      const response: RespuestaAPI<null> = {
        ok: false,
        message: error instanceof Error ? error.message : 'Error interno del servidor'
      };
      res.status(500).json(response);
    }
  };

  // GET /api/proyectos/:proyectoId/estudiantes - Obtener estudiantes de un proyecto
  getEstudiantesByProyecto = async (req: Request, res: Response): Promise<void> => {
    try {
      const proyectoId = Number(req.params.proyectoId);

      if (isNaN(proyectoId)) {
        const response: RespuestaAPI<null> = {
          ok: false,
          message: 'ID de proyecto inválido'
        };
        res.status(400).json(response);
        return;
      }

      const estudiantesProyecto = await this.service.findByProyectoId(proyectoId);
      
      const response: RespuestaAPI<EstudianteProyecto[]> = {
        ok: true,
        message: 'Estudiantes del proyecto obtenidos exitosamente',
        data: estudiantesProyecto
      };
      
      res.status(200).json(response);
    } catch (error) {
      const response: RespuestaAPI<null> = {
        ok: false,
        message: error instanceof Error ? error.message : 'Error interno del servidor'
      };
      res.status(500).json(response);
    }
  };

  // GET /api/proyectos/:proyectoId/estudiantes/activos - Obtener estudiantes activos de un proyecto
  getEstudiantesActivosByProyecto = async (req: Request, res: Response): Promise<void> => {
    try {
      const proyectoId = Number(req.params.proyectoId);

      if (isNaN(proyectoId)) {
        const response: RespuestaAPI<null> = {
          ok: false,
          message: 'ID de proyecto inválido'
        };
        res.status(400).json(response);
        return;
      }

      const estudiantesActivos = await this.service.findEstudiantesActivosByProyecto(proyectoId);
      
      const response: RespuestaAPI<EstudianteProyecto[]> = {
        ok: true,
        message: 'Estudiantes activos del proyecto obtenidos exitosamente',
        data: estudiantesActivos
      };
      
      res.status(200).json(response);
    } catch (error) {
      const response: RespuestaAPI<null> = {
        ok: false,
        message: error instanceof Error ? error.message : 'Error interno del servidor'
      };
      res.status(500).json(response);
    }
  };

  // PUT /api/proyectos/:proyectoId/estudiantes/:estudianteId - Actualizar relación estudiante-proyecto
  updateEstudianteProyecto = async (req: Request, res: Response): Promise<void> => {
    try {
      const proyectoId = Number(req.params.proyectoId);
      const estudianteId = Number(req.params.estudianteId);
      const updateDto = req.body as UpdateEstudianteProyectoDto;

      if (isNaN(proyectoId) || isNaN(estudianteId)) {
        const response: RespuestaAPI<null> = {
          ok: false,
          message: 'IDs inválidos'
        };
        res.status(400).json(response);
        return;
      }

      const updatedRelation = await this.service.update(proyectoId, estudianteId, updateDto);
      
      if (!updatedRelation) {
        const response: RespuestaAPI<null> = {
          ok: false,
          message: 'Relación estudiante-proyecto no encontrada'
        };
        res.status(404).json(response);
        return;
      }

      const response: RespuestaAPI<EstudianteProyecto> = {
        ok: true,
        message: 'Relación estudiante-proyecto actualizada exitosamente',
        data: updatedRelation
      };
      
      res.status(200).json(response);
    } catch (error) {
      const response: RespuestaAPI<null> = {
        ok: false,
        message: error instanceof Error ? error.message : 'Error interno del servidor'
      };
      res.status(400).json(response);
    }
  };


  // GET /estudiantes/:estudianteId/proyectos - Obtener proyectos de un estudiante (para usar en rutas de estudiante)
  getProyectosByEstudiante = async (req: Request, res: Response): Promise<void> => {
    try {
      const estudianteId = Number(req.params.estudianteId);

      if (isNaN(estudianteId)) {
        const response: RespuestaAPI<null> = {
          ok: false,
          message: 'ID de estudiante inválido'
        };
        res.status(400).json(response);
        return;
      }

      const proyectosEstudiante = await this.service.findByEstudianteId(estudianteId);
      
      const response: RespuestaAPI<EstudianteProyecto[]> = {
        ok: true,
        message: 'Proyectos del estudiante obtenidos exitosamente',
        data: proyectosEstudiante
      };
      
      res.status(200).json(response);
    } catch (error) {
      const response: RespuestaAPI<null> = {
        ok: false,
        message: error instanceof Error ? error.message : 'Error interno del servidor'
      };
      res.status(500).json(response);
    }
  };

  // GET /estudiantes/:estudianteId/proyectos/activos - Obtener proyectos activos de un estudiante
  getProyectosActivosByEstudiante = async (req: Request, res: Response): Promise<void> => {
    try {
      const estudianteId = Number(req.params.estudianteId);

      if (isNaN(estudianteId)) {
        const response: RespuestaAPI<null> = {
          ok: false,
          message: 'ID de estudiante inválido'
        };
        res.status(400).json(response);
        return;
      }

      const proyectosActivos = await this.service.findProyectosActivosByEstudiante(estudianteId);
      
      const response: RespuestaAPI<EstudianteProyecto[]> = {
        ok: true,
        message: 'Proyectos activos del estudiante obtenidos exitosamente',
        data: proyectosActivos
      };
      
      res.status(200).json(response);
    } catch (error) {
      const response: RespuestaAPI<null> = {
        ok: false,
        message: error instanceof Error ? error.message : 'Error interno del servidor'
      };
      res.status(500).json(response);
    }
  };
}