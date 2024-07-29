import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from '../../../share/constants/enpoints.constant';
import { Observable } from 'rxjs';
import { IConsignacion } from '../interfaces/consignacion.interface';

@Injectable({
  providedIn: 'root'
})
export class ConsignacionService {

  constructor(
    private http: HttpClient
  ) { }

  getConsignacion(): Observable<IConsignacion[]>{
    return this.http.get<IConsignacion[]>(`${ENDPOINTS.api}consignacion/listar`)
  }

  getConsignacionPorId(id_consignacion: string): Observable<IConsignacion>{
    return this.http.get<IConsignacion>(`${ENDPOINTS.api}consignacion/${id_consignacion}`)
  }

  saveConsignacion(payload: IConsignacion): Observable<IConsignacion>{
    return this.http.post<IConsignacion>(`${ENDPOINTS.api}consignacion/register`, payload)
  }

  desactivarConsignacion(id_consignacion: string): Observable<IConsignacion>{
    return this.http.delete<IConsignacion>(`${ENDPOINTS.api}consignacion/desactivar/${id_consignacion}`)
  }
  
  activarConsignacion(id_consignacion: string): Observable<IConsignacion>{
    return this.http.delete<IConsignacion>(`${ENDPOINTS.api}consignacion/activar/${id_consignacion}`)
  }

  updateConsignacion(payload: IConsignacion): Observable<IConsignacion>{
    return this.http.put<IConsignacion>(`${ENDPOINTS.api}consignacion/update/${payload.id_consignacion}`, payload)
  }

}
