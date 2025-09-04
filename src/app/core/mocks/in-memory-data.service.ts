import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, ResponseOptions } from 'angular-in-memory-web-api';

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
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const now = new Date().toISOString();

    const students: Student[] = [
      { id: 's-1', full_name: 'Ana Martínez', dni: '12345678A', email: 'ana@demo.es', phone: '600111222', created_at: now, updated_at: now },
      { id: 's-2', full_name: 'Pedro López',  dni: '87654321B', email: 'pedro@demo.es', phone: '600333444', created_at: now, updated_at: now },
    ];

    return { students };
  }

  genId<T extends { id: string }>(collection: T[]): string {
    if (!Array.isArray(collection) || collection.length === 0) return 'id-1';
    const prefix = collection[0].id.split('-')[0];
    const numbers = collection.map(i => parseInt(i.id.split('-')[1], 10)).filter(n => !isNaN(n));
    const next = numbers.length ? Math.max(...numbers) + 1 : 1;
    return `${prefix}-${next}`;
  }

  responseInterceptor(resOptions: ResponseOptions, _reqInfo: RequestInfo) {
    resOptions.headers?.set('x-mock', 'true');
    return resOptions;
  }
}
