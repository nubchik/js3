import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService, Product } from './products.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div style="padding: 20px; font-family: sans-serif;" *ngIf="product">
      <h2>Детальна інформація</h2>
      <p><strong>ID:</strong> {{ product.id }}</p>
      <p><strong>Назва:</strong> {{ product.name }}</p>
      <p><strong>Ціна:</strong> {{ product.price }} грн</p>
      <p><strong>Категорія:</strong> {{ product.category }}</p>
      <p><strong>Опис:</strong> {{ product.description || 'Не вказано' }}</p>
      <a routerLink="/" style="display: inline-block; margin-top: 15px;">← Назад до списку</a>
    </div>
  `
})
export class ProductDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(ProductsService);
  product?: Product;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.product = this.service.get(id);
    }
  }
}