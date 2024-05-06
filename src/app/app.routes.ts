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
          import('./pages/deleted-tasks/deleted-tasks.component').then(
            (m) => m.DeletedTasksComponent
          ),
      },
      {
        path: ROUTE_CONSTANTS.MY_TASKS,
        loadComponent: () =>
          import('./pages/my-tasks/my-tasks.component').then(
            (m) => m.MyTasksComponent
          ),
      },
      {
        path: ROUTE_CONSTANTS.IMPORTANT,
        loadComponent: () =>
          import('./pages/important-tasks/important-tasks.component').then(
            (m) => m.ImportantTasksComponent
          ),
      },
      {
        path: ROUTE_CONSTANTS.DONE,
        loadComponent: () =>
          import('./pages/done-tasks/done-tasks.component').then(
            (m) => m.DoneTasksComponent
          ),
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
