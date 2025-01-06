import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  productId: string | null = null;
  product: any;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.productId = params['productId'];
      if (this.productId) {
        this.productService.getProduct(this.productId).subscribe((product: any) => {
          this.product = product;
        });
      }
    });
  }
}
