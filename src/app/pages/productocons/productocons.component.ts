import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { IProductocons } from './interfaces/productocons.inteface';
import { ProductoconsService } from './services/productocons.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageService, NzMessageModule } from 'ng-zorro-antd/message';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CategoriaService } from '../categoria/services/categoria.service';
import { ICategoria } from '../categoria/interfaces/categoria.interface';
import { IProducto } from '../producto/interfaces/producto.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productocons',
  standalone: true,
  imports: [
    CommonModule,
    NzInputModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzTableModule,
    NzModalModule,
    RouterModule,
    NzPopconfirmModule,
    NzMessageModule,
    NzSelectModule,
  ],
  templateUrl: './productocons.component.html',
  styleUrl: './productocons.component.scss',
})
export class ProductoconsComponent implements OnInit {
  value: string = '';
  productos: IProductocons[] = [];
  productosTmp: IProductocons[] = [];
  listCategoria: ICategoria[] = [];
  productosVendidos: IProducto[] = [];
  productosNoVendidos: IProducto[] = [];
  productosVendidosTmp: IProducto[] = [];
  productosNoVendidosTmp: IProducto[] = [];
  form!: FormGroup;
  isVisible: boolean = false;
  descripcion: string = '';
  id_categoria: string = '';
  cod_consignacion: string = '';
  categoria: string = '';
  talle: string = '';
  precio: string = '';
  activo: string = '';
  consignacionId: string = '';
  cod_producto: string = '';
  id_producto: string = '';
  productoId: string = '';
  codigoConsignacion?: string = '';
  valorinput1: string = '';
  valorinput2: string = '';
  opcionSeleccionada: string = '';
  init: boolean = false;

  constructor(
    private productoconsServices: ProductoconsService,
    private listcategoriaService: CategoriaService,
    private message: NzMessageService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    // Inicializa ventaTmp con tus datos originales (ejemplo)
    this.productosTmp = [
      { descripcion: '', cod_producto: '' },
      // Otros productos...
    ];
    // Inicializa venta con los datos originales al inicio
    this.productos = this.productosTmp;
    // Obtener el ID del usuario al inicializar el componente
    this.initForm();
  }

  ngOnInit() {
    this.consignacionId =
      this.route.snapshot.paramMap.get('id_consignacion') || '';
    this.obtenerProductosPorConsignacion(this.consignacionId);
    this.obtenerProductosVendidosPorConsignacion(this.consignacionId);
    this.obtenerTodosProductosPorConsignacion(this.consignacionId);
    this.getCategoria();
  }

  initForm() {
    this.form = this.fb.group({
      id_producto: new FormControl(''),
      cod_producto: new FormControl(''),
      id_categoria: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      talle: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      activo: new FormControl('Si', [Validators.required]),
    });
    this.reset();
  }

  getCategoria() {
    this.listcategoriaService.getCategoria().subscribe((listCategoria) => {
      this.listCategoria = listCategoria;
    });
  }

  openModal() {
    this.initForm();
    this.isVisible = true;
    this.reset();
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
  this.init = true;
  if (this.form.valid) {
    if (this.productoId) {
      this.update();
    } else {
      this.createProducto();
    }
    this.isVisible = false; 
  } 
}

createProducto() {
  this.productoconsServices
    .saveProducto(this.consignacionId, this.form.value)
    .subscribe(_ => {
      this.message.success('Producto creado');
      this.obtenerProductosPorConsignacion(this.consignacionId);
      this.obtenerTodosProductosPorConsignacion(this.consignacionId);
      this.obtenerProductosVendidosPorConsignacion(this.consignacionId);
      this.initForm();
      this.reset();
    });
}

update() {
  this.productoconsServices.updateProducto(this.form.value).subscribe(_ => {
    this.message.success('Producto actualizado');
    this.obtenerProductosPorConsignacion(this.consignacionId);
    this.obtenerTodosProductosPorConsignacion(this.consignacionId);
    this.obtenerProductosVendidosPorConsignacion(this.consignacionId);
    this.initForm();
    this.reset();
  });
}

edit(data: IProductocons) {
  this.productoId = data.id_producto || ''; // Asegúrate de usar el ID correcto del producto
  this.form.patchValue(data);
  this.isVisible = true;
  this.reset();
}

  reset() {
    this.cod_consignacion = '';
    this.talle = '';
    this.precio = '';
    this.activo = '';
  }
  

  desactivarProducto(id_producto: string) {
    this.productoconsServices.desactivarProducto(id_producto).subscribe((_) => {
      this.message.success('Producto desactivado');
      this.obtenerProductosPorConsignacion(this.consignacionId);
      this.obtenerProductosVendidosPorConsignacion(this.consignacionId);
      this.obtenerTodosProductosPorConsignacion(this.consignacionId);
    });
  }

  activarProducto(id_producto: string) {
    this.productoconsServices.activarProducto(id_producto).subscribe((_) => {
      this.message.success('Producto activado');
      this.obtenerProductosPorConsignacion(this.consignacionId);
      this.obtenerProductosVendidosPorConsignacion(this.consignacionId);
      this.obtenerTodosProductosPorConsignacion(this.consignacionId);
    });
  }

  searchPorDescripcion() {
    this.productosNoVendidosTmp = this.productosNoVendidos.filter(
      (producto: IProductocons) =>
        producto.descripcion
          .toLocaleLowerCase()
          .indexOf(this.valorinput1.toLocaleLowerCase()) > -1
    );
    this.productosVendidosTmp = this.productosVendidos.filter(
      (producto: IProductocons) =>
        producto.descripcion
          .toLocaleLowerCase()
          .indexOf(this.valorinput1.toLocaleLowerCase()) > -1
    );
    this.productos = this.productosTmp.filter(
      (producto: IProductocons) =>
        producto.descripcion
          .toLocaleLowerCase()
          .indexOf(this.valorinput1.toLocaleLowerCase()) > -1
    );
  }

  searchPorCodigo() {
    this.productosNoVendidosTmp = this.productosNoVendidos.filter(
      (producto: IProductocons) =>
        producto.cod_producto
          .toLocaleLowerCase()
          .indexOf(this.valorinput2.toLocaleLowerCase()) > -1
    );
    this.productosVendidosTmp = this.productosVendidos.filter(
      (producto: IProductocons) =>
        producto.cod_producto
          .toLocaleLowerCase()
          .indexOf(this.valorinput2.toLocaleLowerCase()) > -1
    );
    this.productos = this.productosTmp.filter(
      (producto: IProductocons) =>
        producto.cod_producto
          .toLocaleLowerCase()
          .indexOf(this.valorinput2.toLocaleLowerCase()) > -1
    );
  }

  // Método para manejar el cambio en el select
  onSelectChange(event: any) {
    this.opcionSeleccionada = event.target.value;
  }

  obtenerTodosProductosPorConsignacion(consignacionId: string) {
    this.productoconsServices
      .getTodosProductoPorConsignacion(this.consignacionId)
      .subscribe((producto) => {
        const productoSeleccionado = producto[0];
        this.codigoConsignacion = productoSeleccionado.cod_consignacion;
        this.productosTmp = producto;
        this.productos = producto;
      });
  }

  obtenerProductosPorConsignacion(consignacionId: string) {
    this.productoconsServices
      .getProductoPorConsignacion(this.consignacionId)
      .subscribe((producto) => {
        const productoSeleccionado = producto[0];
        this.codigoConsignacion = productoSeleccionado.cod_consignacion;
        this.productosVendidos = producto;
        this.productosVendidosTmp = producto;
      });
  }

  obtenerProductosVendidosPorConsignacion(consignacionId: string) {
    this.productoconsServices
      .getProductoVendidosPorConsignacion(this.consignacionId)
      .subscribe((producto) => {
        const productoSeleccionado = producto[0];
        this.codigoConsignacion = productoSeleccionado.cod_consignacion;
        this.productosNoVendidos = producto;
        this.productosNoVendidosTmp = producto;
      });
  }

  get ProductoID() {
    return this.form.get('id_producto');
  }

  get Descripcion() {
    return this.form.get('descripcion');
  }

  get Talle() {
    return this.form.get('talle');
  }

  get Precio() {
    return this.form.get('precio');
  }

  get Activo() {
    return this.form.get('activo');
  }

  get CategoriaID() {
    return this.form.get('id_categoria');
  }
}
