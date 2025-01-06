import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent {
  @Input() product: any;

  constructor(private router: Router, private http: HttpClient) {}

  buyNow(product: any) {
    const purchaseData = {
      productId: product._id,
      productName: product.name,
      productPrice: product.price,
      quantity: 1
    };

    this.http.post('http://localhost:5000/api/purchases', purchaseData).subscribe(
      (response: any) => {
        console.log('Purchase successful', response);
        alert(`${product.name} purcha`);
        this.router.navigate(['/checkout'], { queryParams: { productId: product._id } });
      },
      (error: any) => {
        console.error('Purchase failed', error);
      }
    );
  }
}
