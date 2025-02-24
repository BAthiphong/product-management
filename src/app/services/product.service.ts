import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/products'

  constructor(private http: HttpClient) {}

  // ฟังก์ชัน getProducts สำหรับดึงข้อมูลสินค้าทั้งหมด
  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // ฟังก์ชัน getProductById สำหรับดึงข้อมูลสินค้าตาม ID
  getProductById(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${productId}`);
  }

   // ฟังก์ชันที่ใช้ในการอัปเดตข้อมูลสินค้า
   updateProduct(product: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${product._id}`, product); // ใช้ PATCH request เพื่ออัปเดตสินค้า
  }

  //delete product
  removeProduct(productId: string): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}/${productId}`);
  }
}
