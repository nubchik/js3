import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div style="padding: 20px; font-family: sans-serif;">
      <h2>Список послуг та товарів PulseFit</h2>
      <a routerLink="/add-product" style="display: inline-block; margin-bottom: 15px; padding: 8px 12px; background: #28a745; color: white; text-decoration: none; border-radius: 4px;">+ Додати новий запис</a>
      
      <table border="1" cellpadding="8" cellspacing="0" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background: #f4f4f4;">
            <th>ID</th>
            <th>Назва</th>
            <th>Ціна (грн)</th>
            <th>Категорія</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let p of products()">
            <td>{{ p.id }}</td>
            <td><strong>{{ p.name }}</strong></td>
            <td>{{ p.price }}</td>
            <td>{{ p.category }}</td>
            <td>
              <a [routerLink]="['/products', p.id]" style="margin-right: 10px;">Деталі</a>
              <button (click)="onDelete(p.id!)" style="color: red; cursor: pointer;">Видалити</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class ProductsListComponent {
  private service = inject(ProductsService);
  products = this.service.products;

  onDelete(id: number) {
    if (confirm('Видалити цей запис?')) {
      this.service.delete(id);
    }
  }
}