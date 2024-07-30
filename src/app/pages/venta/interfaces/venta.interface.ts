import { IVentasDetalles } from "../../ventas-detalles/interfaces/ventas-detalles.interface"

export interface IVenta{
   id_usuario?: string 
   id_cabecera?: string
   id_producto?: string
   cod_consignacion?: string
   id_consignacion?: string
   categoria?: string
   id_categoria?: string
   precio?: string
   descripcion: string
   cod_producto: string
   fecha?: string
   total_venta?: string
   nuevoEstado?: string 
   detalles?: IVentasDetalles[]
}