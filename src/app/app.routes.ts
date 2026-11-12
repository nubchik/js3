import { Routes } from '@angular/router';
import { ProductsListComponent } from './products-list.component';
import { ProductFormComponent } from './product-form.component';
import { ProductDetailsComponent } from './product-details.component';

export const routes: Routes = [
  { path: '', component: ProductsListComponent },
  { path: 'add-product', component: ProductFormComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: '**', redirectTo: '' }
];