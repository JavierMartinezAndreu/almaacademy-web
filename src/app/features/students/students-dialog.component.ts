// src/app/features/students/students-dialog.component.ts
import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { StudentsService, Student } from '../../core/services/students.service';

@Component({
  standalone: true,
  selector: 'app-students-dialog',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <h2>{{data ? 'Editar alumno' : 'Nuevo alumno'}}</h2>
    <form [formGroup]="form" (ngSubmit)="save()" style="display:grid; gap:12px; width:420px; max-width:100%;">
      <mat-form-field appearance="outline">
        <mat-label>Nombre completo</mat-label>
        <input matInput formControlName="full_name" required>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>DNI</mat-label>
        <input matInput formControlName="dni">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Email</mat-label>
        <input matInput type="email" formControlName="email">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Teléfono</mat-label>
        <input matInput formControlName="phone">
      </mat-form-field>

      <div style="display:flex; gap:12px; justify-content:flex-end;">
        <button mat-button type="button" (click)="close()">Cancelar</button>
        <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid">Guardar</button>
      </div>
    </form>
  `
})
export class StudentsDialogComponent {
  private fb = inject(FormBuilder);
  private api = inject(StudentsService);
  private ref = inject(MatDialogRef<StudentsDialogComponent>);

  form!: FormGroup<{
    full_name: any; // simplificamos para no liarnos con tipos genéricos del form
    dni: any;
    email: any;
    phone: any;
  }>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Student | null) {
    // ⚠️ Aquí ya existe `data`, por eso inicializamos el form en el constructor
    this.form = this.fb.nonNullable.group({
      full_name: this.data?.full_name ?? '',
      dni: this.data?.dni ?? '',
      email: this.data?.email ?? '',
      phone: this.data?.phone ?? '',
    });
  }

  save() {
    // Los valores del form pueden traer null si no usáramos `nonNullable`.
    // Aun así, normalizamos por claridad:
    const v = this.form.value as {
      full_name: string;
      dni?: string;
      email?: string;
      phone?: string;
    };

    const payload: Partial<Student> = {
      full_name: v.full_name ?? '',
      dni: v.dni ?? '',
      email: v.email ?? '',
      phone: v.phone ?? '',
    };

    if (this.data?.id) {
      this.api.update(this.data.id, payload).subscribe(() => this.ref.close(true));
    } else {
      this.api.create(payload).subscribe(() => this.ref.close(true));
    }
  }

  close() {
    this.ref.close(false);
  }
}
