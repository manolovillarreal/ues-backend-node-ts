import type  { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import type { RespuestaAPI } from '../models/RespuestaAPI.js';

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret';

class AuthController {
  async login(req: Request, res: Response) {
    const { username } = req.body;
    
    if (!username) {
      const response: RespuestaAPI = {
        ok: false,
        message: 'Username es requerido'
      };
      return res.status(400).json(response);
    }

    const role = username === 'admin' ? 'admin' : username === 'prof' ? 'profesor' : 'estudiante';
    const token = jwt.sign({ username, role }, JWT_SECRET, { expiresIn: '8h' });

    const response: RespuestaAPI = {
      ok: true,
      message: 'Login exitoso',
      data: { token, role }
    };

    return res.json(response);
  }
}

export default new AuthController();
