import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface Product {
  id?: number;
  name: string;
  price: number;
  category: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // тестовий API
  
  // Angular Signals для керування станом
  products = signal<Product[]>([
    { id: 1, name: 'Абонемент Безліміт', price: 1200, category: 'Послуги', description: 'Доступ до всіх зон 24/7' },
    { id: 2, name: 'Протеїн Whey 1kg', price: 950, category: 'Товари', description: 'Сироватковий ізолят' },
    { id: 3, name: 'Персональне тренування', price: 500, category: 'Послуги', description: '1 година з тренером' }
  ]);

  constructor(private http: HttpClient) {}

  list(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  get(id: number): Product | undefined {
    return this.products().find(p => p.id === id);
  }

  create(product: Product): void {
    const newProduct = { ...product, id: Date.now() };
    this.products.update(items => [...items, newProduct]);
  }

  update(id: number, updatedProduct: Product): void {
    this.products.update(items =>
      items.map(p => (p.id === id ? { ...updatedProduct, id } : p))
    );
  }

  delete(id: number): void {
    this.products.update(items => items.filter(p => p.id !== id));
  }
}