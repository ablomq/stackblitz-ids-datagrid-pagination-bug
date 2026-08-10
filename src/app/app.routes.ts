import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'grid',
        pathMatch: 'full',
    },
    {
        path: 'grid',
        loadComponent: () => import('./grid-page/grid-page.component').then((m) => m.GridPageComponent),
        data: { saveComponent: true },
    },
    {
        path: 'other',
        loadComponent: () => import('./other-page/other-page.component').then((m) => m.OtherPageComponent),
    },
];
