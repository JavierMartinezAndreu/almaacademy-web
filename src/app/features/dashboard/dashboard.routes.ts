import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  template: `
    <h2>Dashboard</h2>
    <p>Bienvenido al panel de gestión</p>
  `,
  imports: [CommonModule]
})
export class DashboardComponent {}

export const DASHBOARD_ROUTES: Routes = [
  { path: '', component: DashboardComponent }
];
