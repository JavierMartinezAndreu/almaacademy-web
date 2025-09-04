import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Student {
  id: string;
  full_name: string;
  dni: string;
  email: string;
  phone?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

@Injectable({ providedIn: 'root' })
export class StudentsService {
  private http = inject(HttpClient);
  private base = '/api/students';

  list(): Observable<Student[]> { return this.http.get<Student[]>(this.base); }
  create(data: Partial<Student>): Observable<Student> { return this.http.post<Student>(this.base, data); }
  update(id: string, data: Partial<Student>): Observable<Student> { return this.http.put<Student>(`${this.base}/${id}`, data); }
  remove(id: string): Observable<void> { return this.http.delete<void>(`${this.base}/${id}`); }
}
