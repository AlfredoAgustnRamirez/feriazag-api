import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './services/usuario.service';
import { IUsuario } from './interfaces/usuario.interface';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { RouterModule } from '@angular/router';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    CommonModule,
    NzInputModule,
    NzIconModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzTableModule,
    NzModalModule,
    RouterModule,
    NzPopconfirmModule,
    NzMessageModule,
  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss',
})
export class UsuarioComponent implements OnInit {
  listOfData: IUsuario[] = [];
  listOfDataTmp: IUsuario[] = [];
  form!: FormGroup;
  isVisible: boolean = false;
  value: string = '';
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  activo: string = '';
  usuario: string = '';
  id_usuario: string = '';
  password: string = '';
  Passwordd?: string = '';
  userId: string | null = null;
  init: boolean = false;
  UsuarioId?: string = '';

  constructor(
    private UsuarioService: UsuarioService,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.getUsuario();
    this.userId = this.UsuarioService.getUserId();
  }

  initForm() {
    this.form = this.fb.group({
      id_usuario: new FormControl(''),
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      usuario: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      activo: new FormControl('Si', [Validators.required]),
    });
  }

  openModal() {
    this.initForm();
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
  }

  getUsuario() {
    this.UsuarioService.getUsuario().subscribe((usuario: IUsuario[]) => {
      this.listOfData = usuario;
      this.listOfDataTmp = usuario;
    });
  }

  handleOk() {
    this.init = true;

    if (this.form.valid) {
      if (this.UsuarioId) {
        this.update();
      } else {
        this.createUsuario();
      }
      this.isVisible = false;
    }
  }

  createUsuario() {
    this.UsuarioService.saveUsuario(this.form.value).subscribe({
      next: () => {
        this.message.success('Usuario guardado');
        this.getUsuario();
        this.initForm();
      },
      error: (err) => {
        this.message.error('Error al guardar el usuario');
        console.error(err);
      },
    });
  }

  update() {
    this.UsuarioService.updateUsuario(this.form.value).subscribe({
      next: () => {
        this.message.success('Usuario actualizado');
        this.getUsuario();
        this.initForm();
      },
      error: (err) => {
        this.message.error('Error al actualizar el usuario');
        console.error(err);
      },
    });
  }

  edit(data: IUsuario) {
    this.UsuarioId = data.id_usuario;
    this.form.patchValue(data);
    this.isVisible = true;
    this.getUsuario();
  }

  search() {
    this.listOfData = this.listOfDataTmp.filter(
      (usuario: IUsuario) =>
        usuario.nombre
          .toLocaleLowerCase()
          .indexOf(this.value.toLocaleLowerCase()) > -1
    );
  }

  activarUsuario(id_usuario: string) {
    this.UsuarioService.activarUsuario(id_usuario).subscribe((_) => {
      this.message.success('Usuario activado');
      this.getUsuario();
    });
  }

  desactivarUsuario(id_usuario: string) {
    this.UsuarioService.desactivarUsuario(id_usuario).subscribe((_) => {
      this.message.success('Usuario desactivado');
      this.getUsuario();
    });
  }

  get Nombre() {
    return this.form.get('nombre');
  }

  get Apellido() {
    return this.form.get('apellido');
  }

  get Email() {
    return this.form.get('email');
  }

  get Usuario() {
    return this.form.get('usuario');
  }

  get Perfil() {
    return this.form.get('id_perfil');
  }

  get Password() {
    return this.form.get('password');
  }

  get Activo() {
    return this.form.get('activo');
  }

  get UserID() {
    return this.form.get('id_usuario');
  }
}
