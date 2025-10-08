import type  { Request, Response, NextFunction } from 'express';
import { FacultadService } from '../services/facultades.service.js';
import type { RespuestaAPI } from '../models/RespuestaAPI.js';

const service = new FacultadService();

export class FacultadesController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;
      const created = await service.create(payload);
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'Facultad creada exitosamente',
        data: created
      };
      
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const list = await service.findAll();
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'Facultades obtenidas exitosamente',
        data: list
      };
      
      res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      
      if (isNaN(id)) {
        const response: RespuestaAPI = {
          ok: false,
          message: 'ID de facultad inválido'
        };
        res.status(400).json(response);
        return;
      }

      const facultad = await service.findById(id);
      
      if (!facultad) {
        const response: RespuestaAPI = {
          ok: false,
          message: 'Facultad no encontrada'
        };
        res.status(404).json(response);
        return;
      }

      const response: RespuestaAPI = {
        ok: true,
        message: 'Facultad obtenida exitosamente',
        data: facultad
      };
      
      res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const payload = req.body;
      
      if (isNaN(id)) {
        const response: RespuestaAPI = {
          ok: false,
          message: 'ID de facultad inválido'
        };
        res.status(400).json(response);
        return;
      }

      const updated = await service.update(id, payload);
      
      if (!updated) {
        const response: RespuestaAPI = {
          ok: false,
          message: 'Facultad no encontrada'
        };
        res.status(404).json(response);
        return;
      }

      const response: RespuestaAPI = {
        ok: true,
        message: 'Facultad actualizada exitosamente',
        data: updated
      };
      
      res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      
      if (isNaN(id)) {
        const response: RespuestaAPI = {
          ok: false,
          message: 'ID de facultad inválido'
        };
        res.status(400).json(response);
        return;
      }

      const deleted = await service.delete(id);
      
      if (!deleted) {
        const response: RespuestaAPI = {
          ok: false,
          message: 'Facultad no encontrada'
        };
        res.status(404).json(response);
        return;
      }

      const response: RespuestaAPI = {
        ok: true,
        message: 'Facultad eliminada exitosamente'
      };
      
      res.json(response);
    } catch (err) {
      next(err);
    }
  }
}


