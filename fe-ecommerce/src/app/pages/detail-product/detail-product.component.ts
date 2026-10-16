import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss'
})
export class DetailProductComponent implements OnInit {

  public product!: Product;

  constructor(private productService : ProductService,
              private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId === null || productId.trim() === '') {
      return;
    }
    this.loadProduct(productId);
  }

  loadProduct(id : string): void  {
    this.productService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: () => { /* keep template empty when product is missing */ }
    });
  }
  
}
