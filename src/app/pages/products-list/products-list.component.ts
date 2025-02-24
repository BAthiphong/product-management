import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent {
  products: any[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data; // ดึงข้อมูลสินค้าและเก็บไว้ในตัวแปร
      console.log(this.products);
    });
  }

  // ฟังก์ชันสำหรับไปยังหน้าแก้ไขสินค้า
  editProduct(product: any) {
    this.router.navigate(['/Editproduct', { id: product._id }]); // ส่ง ID ของสินค้าไปยังหน้าแก้ไข
  }

  // ฟังก์ชันสำหรับไปยังหน้าเพิ่มสินค้า
  navigateToAddProduct() {
    this.router.navigate(['/CreateProduct']);
  }

  // delete product
  onDelete(id: string): void{
    this.productService.removeProduct(id).subscribe({
      next: () => {
        console.log(`Product with id ${id} deleted successfully`);
        // อัพเดทหลังจากลบ
        this.products = this.products.filter((p) => p._id !== id);
      },
      error: (err) => {
        console.error('Error delete product:', err)
      },
    });
  }

  // ngOnDestroy() {
  //   // ลบข้อมูลเมื่อออกจาก component
  //   this.products = [];
  // }
}
