import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://freeapi.gerasim.in/api/BigBasket';

  public cartUpdated$: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get(`${this.apiUrl}/GetAllCategory`);
  }
  getAllProductsByCategoryId(id: any) {
    return this.http.get(`${this.apiUrl}/GetAllProductsByCategoryId?id=${id}`);
  }
  createProduct(obj: any) {
    return this.http.post(`${this.apiUrl}/CreateProduct`, obj);
  }
  getAllProducts() {
    return this.http.get(`${this.apiUrl}/GetAllProducts`)
  }
  updateProduct(obj: any) {
    return this.http.post(`${this.apiUrl}/UpdateProduct`, obj)
  }
  deleteProduct(id:any) {
    return this.http.get(`${this.apiUrl}/DeleteProductById?id=${id}`)
  }
  addToCart(obj: any) {
    return this.http.post(`${this.apiUrl}/AddToCart`, obj);
  }
  getCartDataByCustomerId(id: number) {
    return this.http.get(`${this.apiUrl}/GetCartProductsByCustomerId?id=${id}`);
  }
  deleteCartItemById(id: number) {
    return this.http.get(`${this.apiUrl}/DeleteProductFromCartById?id=${id}`);
  }
}
