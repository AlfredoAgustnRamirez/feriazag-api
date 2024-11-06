import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { IProducto } from './interfaces/producto.interface';
import { ProductoService } from './services/producto.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageService, NzMessageModule } from 'ng-zorro-antd/message';
import { RouterModule } from '@angular/router';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [
    NzInputModule,
    FormsModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzModalModule,
    RouterModule,
    NzPopconfirmModule,
    NzMessageModule
  ],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent implements OnInit{
  value: string = ''
  productos: IProducto[] = []
  productosTmp: IProducto[] = []
  productosVendidos: IProducto[] = []
  productosNoVendidos: IProducto[] = []
  productosVendidosTmp: IProducto[] = []
  productosNoVendidosTmp: IProducto[] = []
  form!: IProducto
  isVisible: boolean = false
  id_producto: string = ''
  descripcion: string = ''
  id_categoria: string = ''
  productoid: string = ''
  cod_consignacion: string = ''
  id_consignacion: string = ''
  categoria: string = ''
  talle: string = ''
  precio: string = ''
  activo: string = ''
  consignacionId: string = ''
  cod_producto: string = ''
  valorinput1: string = ''
  valorinput2: string = ''
  opcionSeleccionada: string = '';

  constructor(
    private productoServices: ProductoService,
    private message: NzMessageService,
  ){
    // Inicializa ventaTmp con tus datos originales (ejemplo)
    this.productosTmp = [
      { descripcion: '', cod_producto: ''},
      // Otros productos...
    ];
    // Inicializa venta con los datos originales al inicio
    this.productos = this.productosTmp;
    // Obtener el ID del usuario al inicializar el componente
  }

  ngOnInit(){
    this.obtenerProductosVendidos();
    this.obtenerProductos();
    this.obtenerTodosProductos();
  }

  openModal(){
    this.isVisible = true
  }

  handleCancel(){
    this.isVisible = false
  }

  handleOk(){
    this.isVisible = false
  }

  obtenerProductosVendidos() {
    this.productoServices.getProductoVendidos().subscribe(productos => {
      this.productosNoVendidos = productos;
      this.productosNoVendidosTmp = productos;
    });
  }

  obtenerProductos(){
    this.productoServices.getProducto().subscribe(productos => {
      this.productosVendidos = productos;
      this.productosVendidosTmp = productos;      
    });
  }

  obtenerTodosProductos(){
    this.productoServices.getTodosProductos().subscribe(productos => {
      this.productos = productos;
      this.productosTmp = productos;      
    });
  }

   // Método para manejar el cambio en el select
   onSelectChange(event: any) {
    this.opcionSeleccionada = event.target.value;
  }

  reset(){
    this.cod_consignacion = ''
    this.talle = ''
    this.precio = ''
    this.activo = ''
 }
 
  desactivarProducto(id_producto: string){
    this.productoServices.desactivarProducto(id_producto).subscribe(_=>{
      this.message.success('Producto desactivado')
      this.obtenerProductos()
      this.obtenerProductosVendidos()
      this.obtenerTodosProductos()
    })
  }

  activarProducto(id_producto: string){
    this.productoServices.activarProducto(id_producto).subscribe(_=>{
      this.message.success('Producto activado')
      this.obtenerProductosVendidos()
      this.obtenerProductos()
      this.obtenerTodosProductos()
    })
  }

  searchPorDescripcion(){
      this.productosNoVendidosTmp = this.productosNoVendidos.filter((producto: IProducto)=> producto.descripcion.toLocaleLowerCase().indexOf(this.valorinput1.toLocaleLowerCase()) > - 1) 
      this.productosVendidosTmp = this.productosVendidos.filter((producto: IProducto)=> producto.descripcion.toLocaleLowerCase().indexOf(this.valorinput1.toLocaleLowerCase()) > - 1) 
      this.productos = this.productosTmp.filter((producto: IProducto)=> producto.descripcion.toLocaleLowerCase().indexOf(this.valorinput1.toLocaleLowerCase()) > - 1) 
    }
  
  searchPorCodigo(){
    this.productosNoVendidosTmp = this.productosNoVendidos.filter((producto: IProducto)=> producto.cod_producto.toLocaleLowerCase().indexOf(this.valorinput2.toLocaleLowerCase()) > - 1) 
    this.productosVendidosTmp = this.productosVendidos.filter((producto: IProducto)=> producto.cod_producto.toLocaleLowerCase().indexOf(this.valorinput2.toLocaleLowerCase()) > - 1) 
    this.productos = this.productosTmp.filter((producto: IProducto)=> producto.cod_producto.toLocaleLowerCase().indexOf(this.valorinput2.toLocaleLowerCase()) > - 1) 
  }

}

