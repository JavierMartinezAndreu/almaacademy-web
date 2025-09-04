import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive,
    MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule, MatButtonModule
  ],
  template: `
    <mat-sidenav-container style="height:100vh;">
      <mat-sidenav class="m-sidenav" mode="side" opened>
        <div class="logo">AlmaAcademy</div>
        <mat-nav-list>
          <a mat-list-item routerLink="/dashboard" routerLinkActive="m-nav-active">
            <mat-icon>space_dashboard</mat-icon>
            <span style="margin-left:12px;">Dashboard</span>
          </a>
          <a mat-list-item routerLink="/students" routerLinkActive="m-nav-active">
            <mat-icon>group</mat-icon>
            <span style="margin-left:12px;">Alumnos</span>
          </a>
          <a mat-list-item routerLink="/courses" routerLinkActive="m-nav-active">
            <mat-icon>menu_book</mat-icon>
            <span style="margin-left:12px;">Cursos</span>
          </a>
          <a mat-list-item routerLink="/enrollments" routerLinkActive="m-nav-active">
            <mat-icon>assignment_turned_in</mat-icon>
            <span style="margin-left:12px;">Matrículas</span>
          </a>
          <a mat-list-item routerLink="/payments" routerLinkActive="m-nav-active">
            <mat-icon>payments</mat-icon>
            <span style="margin-left:12px;">Pagos</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar class="m-toolbar" color="primary">
          <span style="font-weight:700;">Panel</span>
          <span class="spacer"></span>
          <button mat-button><mat-icon>logout</mat-icon> Salir</button>
        </mat-toolbar>

        <div class="app-container">
          <router-outlet />
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `
})
export class MainLayoutComponent {}
