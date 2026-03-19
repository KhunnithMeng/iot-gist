import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./main/layout/layout').then(m => m.Layout),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard),
                title: 'Dashboard',
                data: { breadcrumb: 'Overview' }
            },
            {
                path: 'log',
                loadComponent: () => import('./pages/audit-log/audit-log').then(m => m.AuditLog),
                title: 'Audit Log',
                data: { breadcrumb: 'Log' }
            }
        ]
    }
];
