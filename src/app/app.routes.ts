import { Routes } from '@angular/router';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';

export const routes: Routes = [
  { path: '', component: ProductsListComponent },
  {
    path: 'CreateProduct',
    component: CreateProductComponent
  },
  {
    path: 'Editproduct/:id', 
    component: EditProductComponent
  },
  {
    path: 'Editproduct',
    component: EditProductComponent
  }
];
