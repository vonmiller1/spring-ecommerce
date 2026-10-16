import { Component, Input, InputSignal, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../common/product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  template: `
      <div class="product-box ">
          <a routerLink="/products/{{productValue().id}}">
              <img src="{{productValue().imageUrl}}" alt="{{productValue().name}}" class="img-responsive">
          </a>
          <a class="d-block" routerLink="/products/{{productValue().id}}">
              <h1 >{{productValue().name}}</h1>
          </a>
          <div class="price">{{productValue().unitPrice | currency:'USD'}}</div>
          <a href="#" class="primary-btn">Add to cart</a>
      </div>
  `,
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  // hello : string = input<string>();
  productValue : InputSignal<Product> = input.required<Product>();
  // @Input({required:true}) product! : Product;

  
}
