import { Component, OnInit } from '@angular/core'
import { CategoriaService } from './services/categoria.service';
import { ICategoria } from './interfaces/categoria.interface';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageService, NzMessageModule } from 'ng-zorro-antd/message';
import { RouterModule} from '@angular/router';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [
    CommonModule,
    NzInputModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzModalModule,
    RouterModule,
    NzPopconfirmModule,
    NzMessageModule
  ],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent implements OnInit{
  listOfData: ICategoria[] = []
  listOfDataTmp: ICategoria[] = []
  form!: FormGroup 
  isVisible: boolean = false
  value: string = ''
  id_categoria: string = ''
  categoriaId?: string = ''
  nombre: string = ''
  activo: string = ''
  init: boolean = false

  constructor(
    private categoriaServices: CategoriaService,
    private message: NzMessageService,
    private fb: FormBuilder
  ){ 
    this.initForm()
  }

  ngOnInit(){
    this.getCategoria()
  }

  initForm(){
    this.form = this.fb.group({
      id_categoria: new FormControl(''),
      descripcion: new FormControl('',[Validators.required],),
      activo: new FormControl('Si',[Validators.required]),
    })
  }

  openModal(){
    this.initForm()
    this.isVisible = true
  }

  handleCancel(){
    this.isVisible = false
  }

  handleOk(){
    this.init = true
    if(this.form.valid){
        if(this.categoriaId){
          this.update()
       }else{
          this.createCategoria()
    }
    this.isVisible = false
    }
   
  }

  getCategoria(){
    this.categoriaServices.getCategoria().subscribe((consignacion: ICategoria[])=>{
      this.listOfData = consignacion
      this.listOfDataTmp = consignacion
    });
  }

  createCategoria(){
      this.categoriaServices.saveCategoria(this.form.value).subscribe(_=>{
      this.message.success('Categoria guardado')
      this.getCategoria()
      this.initForm()   
    });
  }

  activarCategoria(id_categoria: string){
    this.categoriaServices.activarCategoria(id_categoria).subscribe(_=>{
      this.message.success('Categoria activado')
      this.getCategoria()
    })
  }

  desactivarCategoria(id_categoria: string){
    this.categoriaServices.desactivarCategoria(id_categoria).subscribe(_=>{
      this.message.success('Categoria desactivado')
      this.getCategoria()
    })
}

  search(){
    this.listOfData = this.listOfDataTmp.filter((categoria: ICategoria)=> categoria.descripcion.toLocaleLowerCase().indexOf(this.value.toLocaleLowerCase()) > -1) 
  }

  update(){
    this.categoriaServices.updateCategoria(this.form.value).subscribe(_=>{
      this.message.success('Categoria actualizado')
      this.getCategoria()
      this.initForm()
    })
  }

  edit(data: ICategoria){
    this.categoriaId = data.id_categoria
    this.form.patchValue(data) 
    this.isVisible = true
  }

  get Descripcion(){
    return this.form.get('descripcion')
  }

  get Activo(){
    return this.form.get('activo')
  }

  get CategoriaID(){
    return this.form.get('id_categoria')
  }
}
