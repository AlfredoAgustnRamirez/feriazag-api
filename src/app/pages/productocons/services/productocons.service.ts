import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductocons } from '../interfaces/productocons.inteface';
import { ENDPOINTS } from '../../../share/constants/enpoints.constant';

@Injectable({
  providedIn: 'root'
})
export class ProductoconsService {
  
  constructor(
    private http: HttpClient
  ) { }

  

  getProductoPorConsignacion(id_consignacion: string): Observable<IProductocons[]>{
    return this.http.get<IProductocons[]>(`${ENDPOINTS.api}productocons/${id_consignacion}`)
  }

  getProductoVendidosPorConsignacion(id_consignacion: string): Observable<IProductocons[]>{
    return this.http.get<IProductocons[]>(`${ENDPOINTS.api}productocons/vendidos/${id_consignacion}`)
  }

  getTodosProductoPorConsignacion(id_consignacion: string): Observable<IProductocons[]>{
    return this.http.get<IProductocons[]>(`${ENDPOINTS.api}productocons/todos/${id_consignacion}`)
  }

  saveProducto(id_consignacion: string, payload: IProductocons): Observable<IProductocons>{
    return this.http.post<IProductocons>(`${ENDPOINTS.api}productocons/${id_consignacion}`, payload)
  }

  desactivarProducto(id_producto: string): Observable<IProductocons>{
    return this.http.delete<IProductocons>(`${ENDPOINTS.api}productocons/desactivar/${id_producto}`)
  }

  activarProducto(id_producto: string): Observable<IProductocons>{
    return this.http.delete<IProductocons>(`${ENDPOINTS.api}productocons/activar/${id_producto}`)
  }

  updateProducto(payload: IProductocons): Observable<IProductocons>{
    return this.http.put<IProductocons>(`${ENDPOINTS.api}productocons/update/${payload.id_producto}`, payload)
  }
}
