import { Component, Input } from '@angular/core';
import { Article } from '../models/article';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.css'
})
export class NewsListComponent {

  @Input() article!: Article;


}
