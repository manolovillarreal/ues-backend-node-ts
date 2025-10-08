import type { Request, Response } from 'express';
import { ProyectoService } from '../services/proyecto.service.js';
import type { AsignarProyectoDto } from '../dtos/proyecto/index.js';
import type { RespuestaAPI } from '../models/RespuestaAPI.js';

export class ProyectoController {
  private service: ProyectoService;

  constructor(service?: ProyectoService) {
    this.service = service ?? new ProyectoService();
  }

  async asignarProyectoACurso(req: Request, res: Response): Promise<void> {
    try {
      const payload = req.body as AsignarProyectoDto;
      
      const proyecto = await this.service.asignarProyectoACurso(payload);
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'Proyecto asignado al curso exitosamente',
        data: proyecto
      };
      
      res.status(201).json(response);
    } catch (error: any) {
      const response: RespuestaAPI = {
        ok: false,
        message: error.message || 'Error interno del servidor'
      };
      
      res.status(400).json(response);
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const proyectos = await this.service.findAll();
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'Proyectos obtenidos exitosamente',
        data: proyectos
      };
      
      res.status(200).json(response);
    } catch (error: any) {
      const response: RespuestaAPI = {
        ok: false,
        message: error.message || 'Error interno del servidor'
      };
      
      res.status(500).json(response);
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id!);
      const proyecto = await this.service.findById(id);
      
      if (!proyecto) {
        const response: RespuestaAPI = {
          ok: false,
          message: 'Proyecto no encontrado'
        };
        res.status(404).json(response);
        return;
      }
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'Proyecto obtenido exitosamente',
        data: proyecto
      };
      
      res.status(200).json(response);
    } catch (error: any) {
      const response: RespuestaAPI = {
        ok: false,
        message: error.message || 'Error interno del servidor'
      };
      
      res.status(500).json(response);
    }
  }

  async findByCursoId(req: Request, res: Response): Promise<void> {
    try {
      const cursoId = parseInt(req.params.cursoId!);
      const proyectos = await this.service.findByCursoId(cursoId);
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'Proyectos del curso obtenidos exitosamente',
        data: proyectos
      };
      
      res.status(200).json(response);
    } catch (error: any) {
      const response: RespuestaAPI = {
        ok: false,
        message: error.message || 'Error interno del servidor'
      };
      
      res.status(500).json(response);
    }
  }

  async findProyectosActivosByCurso(req: Request, res: Response): Promise<void> {
    try {
      const cursoId = parseInt(req.params.cursoId!);
      const proyectos = await this.service.findProyectosActivosByCurso(cursoId);
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'Proyectos activos del curso obtenidos exitosamente',
        data: proyectos
      };
      
      res.status(200).json(response);
    } catch (error: any) {
      const response: RespuestaAPI = {
        ok: false,
        message: error.message || 'Error interno del servidor'
      };
      
      res.status(500).json(response);
    }
  }

  async desasignarProyectoDeCurso(req: Request, res: Response): Promise<void> {
    try {
      const proyectoId = parseInt(req.params.id!);
      
      const desasignado = await this.service.desasignarProyectoDeCurso(proyectoId);
      
      if (!desasignado) {
        const response: RespuestaAPI = {
          ok: false,
          message: 'No se pudo desasignar el proyecto'
        };
        res.status(400).json(response);
        return;
      }
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'Proyecto desasignado exitosamente'
      };
      
      res.status(200).json(response);
    } catch (error: any) {
      const response: RespuestaAPI = {
        ok: false,
        message: error.message || 'Error interno del servidor'
      };
      
      res.status(400).json(response);
    }
  }

 

}