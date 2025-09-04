import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-enrollments',
  template: `<h2>Matrículas</h2><p>Listado de matrículas aquí</p>`,
  imports: [CommonModule]
})
export class EnrollmentsComponent {}

export const ENROLLMENTS_ROUTES: Routes = [{ path: '', component: EnrollmentsComponent }];
