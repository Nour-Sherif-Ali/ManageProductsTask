import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login.component';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, title : 'Login' },
  { path: 'products', component: ProductsComponent, title: 'Products', canActivate: [authGuard] },
  { path: '**', redirectTo: 'products' }
];
