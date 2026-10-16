import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product/product.service';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
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

    this.handleProduct(productId);
  }

  handleProduct(id : string | null): void  {
    this.productService.getProduct(id).subscribe(
      product => this.product = product
    );
  }
  
}
