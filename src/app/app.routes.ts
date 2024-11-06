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
      { path: 'producto', loadChildren: () => import('./pages/producto/producto.routes').then(m => m.PRODUCTO_ROUTES) },
      { path: 'productocons/:id_consignacion', loadChildren: () => import('./pages/productocons/productocons.routes').then(m => m.PRODUCTOCONS_ROUTES) },    
      { path: 'usuario', loadChildren: () => import('./pages/usuario/usuario.routes').then(m => m.USUARIO_ROUTES) },
      { path: 'categoria', loadChildren: () => import('./pages/categoria/categoria.routes').then(m => m.CATEGORIA_ROUTES) },
      { path: 'venta', loadChildren: () => import('./pages/venta/venta.routes').then(m => m.VENTA_ROUTES) },
      { path: 'venta-normal', loadChildren: () => import('./pages/venta-normal/venta-normal.routes').then(m => m.VENTANORMAL_ROUTES) },
      { path: 'ventas-detalles', loadChildren: () => import('./pages/ventas-detalles/ventas-detalles.routes').then(m => m.VENTASDETALLES_ROUTES) },
    ],
    canActivate: [authGuard]
    },
  { path: 'auth', loadComponent: () => import('./core/auth/components/auth/auth.component').then(m => m.AuthComponent) },
  
];
