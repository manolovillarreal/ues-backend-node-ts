

import { proyectosICCIS as proyectosICCISMock } from '../../db/inMemory/index.js';
import type { IHttpAdapter } from '../IHttpAdapter.js';

export class ICCISAdapterMock implements IHttpAdapter {
  async get<T>(url: string): Promise<T> {
    const match = url.match(/\/proyectos\/(\d+)/);
    if (match) {
      const proyecto = proyectosICCISMock.find(p => p.id === parseInt(match[1] || '0'));
      if (!proyecto) throw { response: { status: 404 } };
      return proyecto as T;
    }
    throw { response: { status: 404 } };
  }

  async post(): Promise<any> {
    throw { response: { status: 404 } };
  }

  async put(): Promise<any> {
    throw { response: { status: 404 } };
  }

  async delete(): Promise<void> {
    throw { response: { status: 404 } };
  }
}

