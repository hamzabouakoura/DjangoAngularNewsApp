import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article, Response } from '../models/article';
import { NewsService } from '../services/news.service';
import { NewsListComponent } from "../news-list/news-list.component";
import { CountryService } from '../services/country.service';

@Component({
  selector: 'app-news-category',
  standalone: true,
  templateUrl: 'news-category.component.html',
  styleUrl: 'news-category.component.css',
  imports: [NewsListComponent]
})
export class NewsCategoryComponent implements OnInit {
  articles: Article[] = [];
  filteredArticlesList: Article[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 10;

  constructor(private route: ActivatedRoute, private newsService: NewsService, private countryService: CountryService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const category = params['category'];
      this.loadNewsByCategory(category, this.currentPage);
    });

    this.countryService.country$.subscribe(() => {
      const category = this.route.snapshot.params['category'];
      this.loadNewsByCategory(category, this.currentPage);
    });
  }

  loadNewsByCategory(category: string, page: number): void {
    this.newsService.getArticlesByCategory(category, page, this.pageSize)?.subscribe((articles) => {
      console.log(category);

      this.articles = articles.results;
      this.filteredArticlesList = this.articles;
      this.totalPages = Math.ceil(articles.count / this.pageSize);
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    const category = this.route.snapshot.params['category'];
    this.loadNewsByCategory(category, page);
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
