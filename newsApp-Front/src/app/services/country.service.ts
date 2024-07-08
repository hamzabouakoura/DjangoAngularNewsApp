// src/app/country.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private countrySubject = new BehaviorSubject<string>('us');
  country$ = this.countrySubject.asObservable();

  setCountry(country: string): void {
    this.countrySubject.next(country);
  }

  getCountry(): string {
    return this.countrySubject.value;
  }
}
