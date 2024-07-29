import { Component, NgModule } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthService } from '../../services/auth.service';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { SESSION } from '../../../../share/constants/session.constant';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';



@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    NzInputModule,
    FormsModule,
    NzIconModule,
    NzButtonModule,
    NzPopconfirmModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  passwordVisible = false
  email: string = ''
  password: string = ''

  constructor(
    private AuthService: AuthService,
    private router: Router,
    private message: NzMessageService,
  ){ }

  login(){
    const payload = {
      email: this.email,
      password: this.password
    }
    this.AuthService.login(payload).subscribe((session)=>{
      localStorage.setItem(SESSION.localStorage, JSON.stringify(session))
      this.router.navigate(['/welcome'])
    })
  }
}

