import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NewsListComponent } from './news-list/news-list.component';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { NewsHomeComponent } from './news-home/news-home.component';
import { CountryService } from './services/country.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NewsHomeComponent,
    NewsListComponent,
    RouterModule,
    NgbAlert,


  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

},

)
export class AppComponent implements OnInit {
  selectedCountry?: string;
  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.selectedCountry = this.countryService.getCountry();
  }

  onCountryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const country = selectElement.value;
    this.countryService.setCountry(country);
  }
}
