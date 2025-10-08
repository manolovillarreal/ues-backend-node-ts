import type { Request, Response, NextFunction } from 'express';
import { ProfesorService } from '../services/profesor.service.js';
import type { RespuestaAPI } from '../models/RespuestaAPI.js';

const service = new ProfesorService();

export class ProfesorController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;
      const created = await service.create(payload);
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'Profesor creado exitosamente',
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
        message: 'Profesores obtenidos exitosamente',
        data: list
      };
      
      res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id || '0');
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
      }

      const profesor = await service.findById(id);
      if (!profesor) {
        return res.status(404).json({
          success: false,
          message: 'Profesor no encontrado'
        });
      }

      res.json({
        ok: true,
        data: profesor,
        message: 'Profesor obtenido exitosamente'
      });
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id || '0');
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
      }

      const payload = req.body;
      const updated = await service.update(id, payload);
      
      if (!updated) {
        return res.status(404).json({
          success: false,
          message: 'Profesor no encontrado'
        });
      }

      res.json({
        ok: true,
        data: updated,
        message: 'Profesor actualizado exitosamente'
      });
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id || '0');
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
      }

      const deleted = await service.delete(id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Profesor no encontrado'
        });
      }

      res.json({
        ok: true,
        message: 'Profesor eliminado exitosamente'
      });
    } catch (err) {
      next(err);
    }
  }

  async deactivate(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id || '0');
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
      }

      const updated = await service.deactivate(id);
      
      if (!updated) {
        return res.status(404).json({
          success: false,
          message: 'Profesor no encontrado'
        });
      }

      res.json({
        ok: true,
        data: updated,
        message: 'Profesor desactivado exitosamente'
      });
    } catch (err) {
      next(err);
    }
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id || '0');
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
      }

      const updated = await service.activate(id);
      
      if (!updated) {
        return res.status(404).json({
          success: false,
          message: 'Profesor no encontrado'
        });
      }

      res.json({
        ok: true,
        data: updated,
        message: 'Profesor activado exitosamente'
      });
    } catch (err) {
      next(err);
    }
  }
}

