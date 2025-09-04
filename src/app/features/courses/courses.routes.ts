import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-courses',
  template: `<h2>Cursos</h2><p>Listado de cursos aquí</p>`,
  imports: [CommonModule]
})
export class CoursesComponent {}

export const COURSES_ROUTES: Routes = [{ path: '', component: CoursesComponent }];
