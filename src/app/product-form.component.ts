import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div style="padding: 20px; font-family: sans-serif; max-width: 500px;">
      <h2>Додати новий товар / послугу</h2>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div style="margin-bottom: 12px;">
          <label>Назва:</label><br>
          <input formControlName="name" style="width: 100%; padding: 6px;">
        </div>
        <div style="margin-bottom: 12px;">
          <label>Ціна:</label><br>
          <input type="number" formControlName="price" style="width: 100%; padding: 6px;">
        </div>
        <div style="margin-bottom: 12px;">
          <label>Категорія:</label><br>
          <select formControlName="category" style="width: 100%; padding: 6px;">
            <option value="Послуги">Послуги</option>
            <option value="Товари">Товари</option>
          </select>
        </div>
        <div style="margin-bottom: 12px;">
          <label>Опис:</label><br>
          <textarea formControlName="description" style="width: 100%; padding: 6px;"></textarea>
        </div>
        <button type="submit" [disabled]="form.invalid" style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Зберегти</button>
        <a routerLink="/" style="margin-left: 10px;">Скасувати</a>
      </form>
    </div>
  `
})
export class ProductFormComponent {
  private fb = inject(FormBuilder);
  private service = inject(ProductsService);
  private router = inject(Router);

  form = this.fb.group({
    name: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    category: ['Послуги', Validators.required],
    description: ['']
  });

  onSubmit() {
    if (this.form.valid) {
      this.service.create(this.form.value as any);
      this.router.navigate(['/']);
    }
  }
}