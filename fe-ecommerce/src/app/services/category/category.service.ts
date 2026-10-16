import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GetResponseCategories } from '../../common/get-response.interface';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../common/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  getCategories() : Observable<Category[]>{
    const searchUrl = `${environment.categoriesURL}`;
    return this.httpClient.get<GetResponseCategories>(searchUrl).pipe(
      map(response => response._embedded.categories)
    );
  }
}
