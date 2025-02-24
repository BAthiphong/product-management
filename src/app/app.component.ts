import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './pages/products-list/products-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ProductsListComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  name: string = '';
  description: string = '';
  price: number | null = null;
  quantity: number | null = null;
  images: File[] = [];
  imagePreviews: string[] = []; // สำหรับเก็บภาพที่จะแสดงตัวอย่าง

  products: any[] = []; // ประกาศตัวแปรสำหรับเก็บข้อมูลสินค้า

  constructor(private http: HttpClient) {}

  // ngOnInit() {
  //   this.fetchProducts(); // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลสินค้าตอนเริ่มต้น
  // }

  fetchProducts() {
    this.http.get<any[]>('http://localhost:3000/products').subscribe(
      (response) => {
        this.products = response; // เก็บข้อมูลสินค้าในตัวแปร products
        console.log('Products:', this.products); // แสดงผลใน console
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  // ฟังก์ชันเมื่อมีการเปลี่ยนแปลงไฟล์ที่เลือก
  onFileChange(event: any) {
    this.images = Array.from(event.target.files); // เก็บไฟล์ที่เลือกไว้ใน array
    this.imagePreviews = []; // เคลียร์ตัวอย่างภาพก่อนหน้า

    // สร้างตัวอย่างภาพใหม่
    for (let file of this.images) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews.push(e.target.result); // เก็บ base64 ของภาพเพื่อแสดงตัวอย่าง
      };
      reader.readAsDataURL(file); // แปลงไฟล์ภาพเป็น base64
    }
  }

  // ฟังก์ชันสร้างสินค้า
  async createProduct() {
    const imageBase64Promises = this.images.map((file) =>
      this.convertToBase64(file)
    );
    const imageBase64 = await Promise.all(imageBase64Promises);

    const productData = {
      name: this.name,
      description: this.description,
      price: this.price,
      quantity: this.quantity,
      images: imageBase64, // ส่งภาพแบบ base64 ไปยัง backend
    };

    this.http.post('http://localhost:3000/products', productData).subscribe(
      (response) => {
        console.log('Success:', response);
        alert('Product created successfully!');
      },
      (error) => {
        console.error('Error:', error);
        alert('Error creating product');
      }
    );
  }

  // ฟังก์ชันแปลงไฟล์เป็น Base64
  private convertToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => resolve(reader.result as string);
    });
  }
}
