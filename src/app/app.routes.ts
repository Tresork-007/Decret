import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { SignupComponent } from './core/auth/signup/signup.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./core/user/dashboard/dashboard.component').then(m => m.DashboardComponent),
    // TODO: Ajouter un guard pour protéger cette route
  },
  {
    path: 'decret/:id',
    loadComponent: () => import('./core/user/decret-view/decret-view.component').then(m => m.DecretViewComponent),
    // TODO: Ajouter un guard pour protéger cette route
  },
  {
    path: 'admin',
    loadComponent: () => import('./core/admin/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      {
        path: 'signature',
        loadComponent: () => import('./core/admin/digital-signature/digital-signature.component').then(m => m.DigitalSignatureComponent)
      },
      {
        path: 'import',
        loadComponent: () => import('./core/admin/decret-import/decret-import.component').then(m => m.DecretImportComponent)
      },
      {
        path: 'list',
        loadComponent: () => import('./core/admin/decret-list/decret-list.component').then(m => m.DecretListComponent)
      },
      { path: '', redirectTo: 'signature', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
