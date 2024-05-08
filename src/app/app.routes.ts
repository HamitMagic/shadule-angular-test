import { Routes } from '@angular/router';
import { ROUTE_CONSTANTS } from './shared/models/route-constants';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    children: [
      {
        path: ROUTE_CONSTANTS.HOME,
        redirectTo: ROUTE_CONSTANTS.MY_TASKS,
        pathMatch: 'full',
      },
      {
        path: ROUTE_CONSTANTS.DELETED,
        loadComponent: () =>
          import('./pages/tasks/tasks.component').then((m) => m.TasksComponent),
      },
      {
        path: ROUTE_CONSTANTS.MY_TASKS,
        loadComponent: () =>
          import('./pages/tasks/tasks.component').then((m) => m.TasksComponent),
      },
      {
        path: ROUTE_CONSTANTS.IMPORTANT,
        loadComponent: () =>
          import('./pages/tasks/tasks.component').then((m) => m.TasksComponent),
      },
      {
        path: ROUTE_CONSTANTS.SEARCH,
        loadComponent: () =>
          import('./pages/tasks/tasks.component').then((m) => m.TasksComponent),
      },
      {
        path: ROUTE_CONSTANTS.DONE,
        loadComponent: () =>
          import('./pages/tasks/tasks.component').then((m) => m.TasksComponent),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
