import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Pasajeros } from './pages/pasajeros/pasajeros';
import { Vehiculos } from './pages/vehiculos/vehiculos';
import { Viajes } from './pages/viajes/viajes';
import { Encomiendas } from './pages/encomiendas/encomiendas';

export const routes: Routes = [
  // Ruta inicial: Al Login
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },

  // RUTA PADRE: Dashboard que mantendrá el Menú Fijo en la pantalla
  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      // Al entrar a /dashboard se queda aquí y muestra las tarjetas estadísticas
      {
        path: 'pasajeros',
        component: Pasajeros
      },
      {
        path: 'vehiculos',
        component: Vehiculos
      },
      {
        path: 'viajes',
        component: Viajes
      },
      {
        path: 'encomiendas',
        component: Encomiendas
      }
    ]
  },

  // Si escriben cualquier otra ruta errónea, regresa al login
  {
    path: '**',
    redirectTo: 'login'
  }
];