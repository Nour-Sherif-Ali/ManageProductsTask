import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly productsSubject = new BehaviorSubject<Product[]>([
    { id: 1, name: 'Starter Pack', price: 29.99, stock: 12 },
    { id: 2, name: 'Wireless Mouse', price: 19.5, stock: 0 },
    { id: 3, name: 'Notebook Pro', price: 999, stock: 7 }
  ]);

  private nextId = 4;

  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  addProduct(product: Omit<Product, 'id'>): void {
    const current = this.productsSubject.getValue();
    const newProduct: Product = { id: this.nextId++, ...product };
    this.productsSubject.next([...current, newProduct]);
  }

  deleteProduct(id: number): void {
    const current = this.productsSubject.getValue();
    this.productsSubject.next(current.filter((product) => product.id !== id));
  }
}
