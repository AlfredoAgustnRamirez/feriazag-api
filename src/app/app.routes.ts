import { Routes } from '@angular/router';
import { MainComponent } from './core/layout/main/main.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/auth' },

  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
      { path: 'consignacion', loadChildren: () => import('./pages/consignacion/consignacion.routes').then(m => m.CONSIGNACION_ROUTES)}, 
      { path: 'usuario', loadChildren: () => import('./pages/usuario/usuario.routes').then(m => m.USUARIO_ROUTES) },
      { path: 'categoria', loadChildren: () => import('./pages/categoria/categoria.routes').then(m => m.CATEGORIA_ROUTES) },
    ],
    canActivate: [authGuard]
    },
  { path: 'auth', loadComponent: () => import('./core/auth/components/auth/auth.component').then(m => m.AuthComponent) },
  
];
