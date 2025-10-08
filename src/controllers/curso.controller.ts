import type { Request, Response } from 'express';
import { CursoService } from '../services/curso.service.js';
import type { CreateCursoDto ,UpdateCursoDto} from '../dtos/curso/index.js';
import type { RespuestaAPI } from '../models/RespuestaAPI.js';

export class CursoController {
  private service: CursoService;

  constructor(service?: CursoService) {
    this.service = service ?? new CursoService();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const payload = req.body as CreateCursoDto;
      const curso = await this.service.create(payload);
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'Curso creado exitosamente',
        data: curso
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
      const cursos = await this.service.findAll();
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'Cursos obtenidos exitosamente',
        data: cursos
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
      const curso = await this.service.findById(id);
      
      if (!curso) {
        const response: RespuestaAPI = {
          ok: false,
          message: 'Curso no encontrado'
        };
        res.status(404).json(response);
        return;
      }
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'Curso obtenido exitosamente',
        data: curso
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
      const cursos = await this.service.findByFacultadId(facultadId);
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'Cursos por facultad obtenidos exitosamente',
        data: cursos
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

  async findByProfesorId(req: Request, res: Response): Promise<void> {
    try {
      const profesorId = parseInt(req.params.profesorId!);
      const cursos = await this.service.findByProfesorId(profesorId);
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'Cursos por profesor obtenidos exitosamente',
        data: cursos
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
      const payload = req.body as UpdateCursoDto;
      const curso = await this.service.update(id, payload);
      
      if (!curso) {
        const response: RespuestaAPI = {
          ok: false,
          message: 'Curso no encontrado'
        };
        res.status(404).json(response);
        return;
      }
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'Curso actualizado exitosamente',
        data: curso
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
          message: 'Curso no encontrado'
        };
        res.status(404).json(response);
        return;
      }
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'Curso eliminado exitosamente'
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

  // Métodos para relación ManyToMany
  async inscribirEstudiante(req: Request, res: Response): Promise<void> {
    try {
      const cursoId = parseInt(req.params.id!);
      const { estudianteId } = req.body;
      
      const inscripcion = await this.service.inscribirEstudiante(cursoId, estudianteId);
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'Estudiante inscrito exitosamente',
        data: inscripcion
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

  async desinscribirEstudiante(req: Request, res: Response): Promise<void> {
    try {
      const cursoId = parseInt(req.params.id!);
      const estudianteId = parseInt(req.params.estudianteId!);
      
      const desinscrito = await this.service.desinscribirEstudiante(cursoId, estudianteId);
      
      if (!desinscrito) {
        const response: RespuestaAPI = {
          ok: false,
          message: 'No se pudo desinscribir al estudiante'
        };
        res.status(400).json(response);
        return;
      }
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'Estudiante desinscrito exitosamente'
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

  async getEstudiantesByCurso(req: Request, res: Response): Promise<void> {
    try {
      const cursoId = parseInt(req.params.id!);
      const estudiantes = await this.service.getEstudiantesByCurso(cursoId);
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'Estudiantes del curso obtenidos exitosamente',
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

  async getCursosByEstudiante(req: Request, res: Response): Promise<void> {
    try {
      const estudianteId = parseInt(req.params.estudianteId!);
      const cursos = await this.service.getCursosByEstudiante(estudianteId);
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'Cursos del estudiante obtenidos exitosamente',
        data: cursos
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
      const curso = await this.service.deactivate(id);
      
      if (!curso) {
        const response: RespuestaAPI = {
          ok: false,
          message: 'Curso no encontrado'
        };
        res.status(404).json(response);
        return;
      }
      
      const response: RespuestaAPI = {
        ok: true,
        message: 'Curso desactivado exitosamente',
        data: curso
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