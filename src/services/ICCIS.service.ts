

import type { IHttpAdapter } from "../adapters/IHttpAdapter.js";
import { ICCISAdapterMock } from "../adapters/impl/ICCISAdapterMock.js";

const API_BASE_URL = 'https://api.iccis.edu.co';
export class ICCISService {
    private httpAdapter: IHttpAdapter;

  constructor(httpAdapter?: IHttpAdapter) {
    this.httpAdapter = httpAdapter ?? new ICCISAdapterMock();
  }

  async validarProyectoExiste(proyectoId: number): Promise<boolean> {   
    try {
      await this.httpAdapter.get(`${API_BASE_URL}/proyectos/${proyectoId}`);
      return true;
    } catch (error: any) {
      if (error.response?.status === 404)
        throw new Error('Proyecto no encontrado en el sistema ICCIS');
      throw new Error('Error en la comunicación con el sistema ICCIS');
    }
  }

  async getProyectoById(proyectoId: number): Promise<any> {
    try {
      return await this.httpAdapter.get(`${API_BASE_URL}/proyectos/${proyectoId}`);
    } catch (error: any) {
      if (error.response?.status === 404)
        throw new Error('Proyecto no encontrado en el sistema ICCIS');
      throw new Error('Error en la comunicación con el sistema ICCIS');
    }
    }
}
