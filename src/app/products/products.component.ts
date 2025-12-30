import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  selectedProductId: number | null = null;

  private readonly formBuilder = inject(FormBuilder);
  private readonly productService = inject(ProductService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly products$ = this.productService.getProducts();

  readonly form = this.formBuilder.group({
    name: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]]
  });

  addProduct(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, price, stock } = this.form.getRawValue();
    this.productService.addProduct({
      name: (name ?? '').trim(),
      price: Number(price ?? 0),
      stock: Number(stock ?? 0)
    });
    this.form.reset({ name: '', price: 0, stock: 0 });
  }

  deleteProduct(id: number): void {
    this.selectedProductId = id;
  }

  cancelDelete(): void {
    this.selectedProductId = null;
  }

  confirmDelete(): void {
    if (this.selectedProductId === null) {
      return;
    }

    this.productService.deleteProduct(this.selectedProductId);
    this.selectedProductId = null;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
