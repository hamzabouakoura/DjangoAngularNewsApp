import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article, Response } from '../models/article';
import { CountryService } from './country.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient, private countryService: CountryService) { }

  private url = `${environment.apiUrl}/news/fetch_news/`;

  getHomeArticles(page: number = 1, pageSize: number = 10): Observable<Response> | undefined {
    const country = this.countryService.getCountry();

    const articles = this.http.get<Response>(`${this.url}?category=general&country=${country}&page=${page}&pageSize=${pageSize}`);
    return articles;
  }

  getArticlesByCategory(category: string, page: number = 1, pageSize: number = 10): Observable<Response> | undefined {
    const country = this.countryService.getCountry();
    const articles = this.http.get<Response>(`${this.url}?category=${category}&country=${country}&page=${page}&pageSize=${pageSize}`);
    return articles;
  }
}
