import type { Request, Response } from 'express';
import { PaisService } from '../services/pais.service.js';
import type { CreatePaisDto, UpdatePaisDto } from '../dtos/pais/index.js';
import type { RespuestaAPI } from '../models/RespuestaAPI.js';

export class PaisController {
  private service: PaisService;

  constructor(service?: PaisService) {
    this.service = service ?? new PaisService();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const payload = req.body as CreatePaisDto;
      const pais = await this.service.create(payload);
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'País creado exitosamente',
        data: pais
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
      const paises = await this.service.findAll();
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'Países obtenidos exitosamente',
        data: paises
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
      const pais = await this.service.findById(id);
      
      if (!pais) {
        const response: RespuestaAPI = {
          ok: false,
          message: 'País no encontrado'
        };
        res.status(404).json(response);
        return;
      }
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'País obtenido exitosamente',
        data: pais
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
      const payload = req.body as UpdatePaisDto;
      const pais = await this.service.update(id, payload);
      
      if (!pais) {
        const response: RespuestaAPI = {
          ok: false,
          message: 'País no encontrado'
        };
        res.status(404).json(response);
        return;
      }
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'País actualizado exitosamente',
        data: pais
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
          message: 'País no encontrado'
        };
        res.status(404).json(response);
        return;
      }
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'País eliminado exitosamente'
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