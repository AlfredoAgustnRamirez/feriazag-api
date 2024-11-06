import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from '../../../share/constants/enpoints.constant';
import { Observable } from 'rxjs';
import { IVentaNormal } from '../interfaces/venta-normal.interface';
import { IVentasDetalles } from '../../ventas-detalles/interfaces/ventas-detalles.interface';

@Injectable({
  providedIn: 'root'
})
export class VentaNormalService {

  constructor(
    private http: HttpClient,
  ) { }

  getProducto(): Observable<IVentaNormal[]>{
    return this.http.get<IVentaNormal[]>(`${ENDPOINTS.api}venta/listar`)
  }

  registrarVenta(idUsuario: string, totalVenta: number, fecha: string, detalles: any[]) {
    const body = { 
      iduser: idUsuario, 
      total_venta: totalVenta, 
      fecha: fecha,
      detalles: detalles,      
    };
    return this.http.post<any>(`${ENDPOINTS.api}venta/register`, body);
  }

  registrarVenta2(idUsuario: string, totalVenta: number, fecha: string, detalles: any[]) {
    const body = { 
        iduser: idUsuario, 
        total_venta: totalVenta, 
        fecha: fecha,
        detalles: detalles      
    };
    return this.http.post<any>(`${ENDPOINTS.api}venta/registrar`, body);
}


  desactivarProducto(idProducto: string): Observable<IVentaNormal>{
    return this.http.delete<IVentaNormal>(`${ENDPOINTS.api}venta/desactivar/${idProducto}`)
  }

}
