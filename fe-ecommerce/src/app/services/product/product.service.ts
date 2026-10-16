import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, debounceTime, map } from 'rxjs';
import { Product } from '../../common/product';
import { environment } from '../../../environments/environment';
import { GetResponseProducts } from '../../common/get-response.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId : number | null): Observable<Product[]> {

    const searchUrl = `${environment.productsURL}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductListPaginate( page: number,
                          pageSize: number,
                          theCategoryId : number | null): Observable<GetResponseProducts>{

    const searchUrl = `${environment.productsURL}/search/findByCategoryId?id=${theCategoryId}`
                    + `&page=${page}&size=${pageSize}`;
    
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductSearchList(input : string | null): Observable<Product[]>{
    const searchUrl = `${environment.productsURL}/search/findByNameContaining?name=${input}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl)
    .pipe(
      map(response => response._embedded.products)
    );
  }

  getProduct(id : string | null): Observable<Product>{
    const searchUrl = `${environment.productsURL}/${id}`;

    return this.httpClient.get<Product>(searchUrl);
  }

}

