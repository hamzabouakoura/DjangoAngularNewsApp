import { Component, inject, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { Article } from '../models/article';
import { NewsListComponent } from "../news-list/news-list.component";
import { CountryService } from '../services/country.service';

@Component({
  selector: 'app-news-home',
  standalone: true,
  templateUrl: './news-home.component.html',
  styleUrl: './news-home.component.css',
  imports: [NewsListComponent]
})
export class NewsHomeComponent implements OnInit {

  newsService: NewsService = inject(NewsService);
  articles: Article[] = [];
  filteredArticlesList: Article[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 10;



  constructor(private countryService: CountryService) {
  }
  ngOnInit(): void {
    this.countryService.country$.subscribe(() => {
      this.loadHomeNews(this.currentPage);
    });
  }

  loadHomeNews(page: number): void {
    this.newsService.getHomeArticles(page, this.pageSize)?.subscribe((articles) => {

      this.articles = articles.results;
      this.filteredArticlesList = this.articles;
      this.totalPages = Math.ceil(articles.count / this.pageSize);
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadHomeNews(page);
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredArticlesList = this.articles;
      return;
    }

    this.filteredArticlesList = this.articles.filter(
      article => article?.title.toLowerCase().includes(text.toLowerCase())
    );
  }

}
