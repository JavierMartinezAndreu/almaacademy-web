import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-payments',
  template: `<h2>Pagos</h2><p>Listado de pagos aquí</p>`,
  imports: [CommonModule]
})
export class PaymentsComponent {}

export const PAYMENTS_ROUTES: Routes = [{ path: '', component: PaymentsComponent }];
