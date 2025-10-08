import type { Request, Response } from 'express';
import { EstudianteService } from '../services/estudiante.service.js';
import type { CreateEstudianteDto, UpdateEstudianteDto} from '../dtos/estudiante/index.js';
import type { RespuestaAPI } from '../models/RespuestaAPI.js';

export class EstudianteController {
  private service: EstudianteService;

  constructor(service?: EstudianteService) {
    this.service = service ?? new EstudianteService();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const payload = req.body as CreateEstudianteDto;
      const estudiante = await this.service.create(payload);
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'Estudiante creado exitosamente',
        data: estudiante
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
      const estudiantes = await this.service.findAll();
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'Estudiantes obtenidos exitosamente',
        data: estudiantes
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
      const estudiante = await this.service.findById(id);
      
      if (!estudiante) {
        const response: RespuestaAPI = {
          ok: false,
          message: 'Estudiante no encontrado'
        };
        res.status(404).json(response);
        return;
      }
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'Estudiante obtenido exitosamente',
        data: estudiante
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

  async findByFacultadId(req: Request, res: Response): Promise<void> {
    try {
      const facultadId = parseInt(req.params.facultadId!);
      const estudiantes = await this.service.findByFacultadId(facultadId);
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'Estudiantes por facultad obtenidos exitosamente',
        data: estudiantes
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

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id!);
      const payload = req.body as UpdateEstudianteDto;
      const estudiante = await this.service.update(id, payload);
      
      if (!estudiante) {
        const response: RespuestaAPI = {
          ok: false,
          message: 'Estudiante no encontrado'
        };
        res.status(404).json(response);
        return;
      }
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'Estudiante actualizado exitosamente',
        data: estudiante
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

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id!);
      const deleted = await this.service.delete(id);
      
      if (!deleted) {
        const response: RespuestaAPI = {
          ok: false,
          message: 'Estudiante no encontrado'
        };
        res.status(404).json(response);
        return;
      }
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'Estudiante eliminado exitosamente'
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

  async deactivate(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id!);
      const estudiante = await this.service.deactivate(id);
      
      if (!estudiante) {
        const response: RespuestaAPI = {
          ok: false,
          message: 'Estudiante no encontrado'
        };
        res.status(404).json(response);
        return;
      }
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'Estudiante desactivado exitosamente',
        data: estudiante
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
}