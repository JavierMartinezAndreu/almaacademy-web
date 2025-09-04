import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet, RouterLink,
    MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule, MatButtonModule
  ],
  template: `
    <mat-sidenav-container style="height:100vh;">
      <mat-sidenav mode="side" opened>
        <div class="logo">AlmaAcademy</div>
        <mat-nav-list>
          <a mat-list-item routerLink="/dashboard">Dashboard</a>
          <a mat-list-item routerLink="/students">Alumnos</a>
          <a mat-list-item routerLink="/courses">Cursos</a>
          <a mat-list-item routerLink="/enrollments">Matrículas</a>
          <a mat-list-item routerLink="/payments">Pagos</a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <span>Panel</span>
          <span class="spacer"></span>
          <button mat-button>Salir</button>
        </mat-toolbar>

        <div style="padding:16px;">
          <!-- AQUÍ SE RENDERIZAN LAS RUTAS -->
          <router-outlet />
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .logo { font-weight: 700; padding: 16px; }
    .spacer { flex: 1 1 auto; }
  `]
})
export class MainLayoutComponent {}
