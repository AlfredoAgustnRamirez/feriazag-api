import { Component, OnInit } from '@angular/core';

interface DashboardData {
  clientes: number;
  ventas: number;
  productos: number;
}

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  currentDateTime: string = '';
  data: DashboardData = {
    clientes: 100,
    ventas: 500,
    productos: 200
  };

  constructor() { }

  ngOnInit() { 
    this.updateDateTime();
  }

  updateDateTime() {
    const now = new Date();
    this.currentDateTime = now.toLocaleString(); // O usa un formato más específico
  }

}
