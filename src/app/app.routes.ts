import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
  },
  {
    path: 'students',
    loadChildren: () =>
      import('./features/students/students.routes').then(m => m.STUDENTS_ROUTES),
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./features/courses/courses.routes').then(m => m.COURSES_ROUTES),
  },
  {
    path: 'enrollments',
    loadChildren: () =>
      import('./features/enrollments/enrollments.routes').then(m => m.ENROLLMENTS_ROUTES),
  },
  {
    path: 'payments',
    loadChildren: () =>
      import('./features/payments/payments.routes').then(m => m.PAYMENTS_ROUTES),
  },
  { path: '**', redirectTo: 'dashboard' }
];
