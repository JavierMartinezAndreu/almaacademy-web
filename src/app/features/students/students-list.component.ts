import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StudentsService, Student } from '../../core/services/students.service';
import { StudentsDialogComponent } from './students-dialog.component';

@Component({
  standalone: true,
  selector: 'app-students-list',
  imports: [CommonModule, MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatDialogModule],
  template: `
    <div class="card" style="margin-bottom:16px;">
        <div style="display:flex; gap:12px; align-items:center;">
        <mat-form-field appearance="outline" style="flex:1;">
            <mat-label>Buscar</mat-label>
            <input matInput (input)="applyFilter($event)" placeholder="Nombre, DNI, email..." />
        </mat-form-field>
        <button mat-flat-button color="primary" (click)="openCreate()">
            <mat-icon>add</mat-icon> Nuevo
        </button>
        </div>
    </div>

    <div class="card">
        <table mat-table [dataSource]="filtered" class="mat-elevation-z1" style="width:100%;">
        <ng-container matColumnDef="full_name">
            <th mat-header-cell *matHeaderCellDef> Nombre </th>
            <td mat-cell *matCellDef="let row"> {{row.full_name}} </td>
        </ng-container>

        <ng-container matColumnDef="dni">
            <th mat-header-cell *matHeaderCellDef> DNI </th>
            <td mat-cell *matCellDef="let row"> {{row.dni}} </td>
        </ng-container>

        <ng-container matColumnDef="email">
            <th mat-header-cell *matHeaderCellDef> Email </th>
            <td mat-cell *matCellDef="let row"> {{row.email}} </td>
        </ng-container>

        <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef class="text-right"></th>
            <td mat-cell *matCellDef="let row" style="text-align:right;">
            <button mat-stroked-button (click)="openEdit(row)" style="margin-right:8px;">Editar</button>
            <button mat-flat-button color="warn" (click)="remove(row)">Borrar</button>
            </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="cols"></tr>
        <tr mat-row *matRowDef="let row; columns: cols;"></tr>
        </table>
    </div>
    `
})
export class StudentsListComponent implements OnInit {
  private api = inject(StudentsService);
  private dialog = inject(MatDialog);

  data: Student[] = [];
  filtered: Student[] = [];
  cols = ['full_name', 'dni', 'email', 'actions'];

  ngOnInit() { this.load(); }

  load() {
        this.api.list().subscribe(res => {
            console.log('students:', res);
            this.data = res;
            this.filtered = res;
        });
    }

  applyFilter(ev: Event) {
    const q = (ev.target as HTMLInputElement).value.toLowerCase();
    this.filtered = this.data.filter(s => [s.full_name, s.dni, s.email].some(v => (v || '').toLowerCase().includes(q)));
  }

  openCreate() {
    const ref = this.dialog.open(StudentsDialogComponent, { data: null });
    ref.afterClosed().subscribe(ok => ok && this.load());
  }

  openEdit(row: Student) {
    const ref = this.dialog.open(StudentsDialogComponent, { data: row });
    ref.afterClosed().subscribe(ok => ok && this.load());
  }

  remove(row: Student) {
    if (!confirm(`¿Borrar a ${row.full_name}?`)) return;
    this.api.remove(row.id).subscribe(() => this.load());
  }
}
