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

  data: DashboardData = {
    clientes: 100,
    ventas: 500,
    productos: 200
  };

  constructor() { }

  ngOnInit() { }

}
