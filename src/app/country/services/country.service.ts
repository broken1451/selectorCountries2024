import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Region, SmallCountry } from '../interfaces/country.interface';
import { combineLatest, forkJoin, map, Observable, of, take } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private _regions: Region[] = [
    Region.Africa,
    Region.Americas,
    Region.Asia,
    Region.Europe,
    Region.Oceania,
  ];

  public get regions(): Region[] {
    return [...this._regions];
  }
  
  
  constructor(private httpClient: HttpClient) { }

  
  getCountriesByRegion(region: Region | string): Observable<SmallCountry[]> {

    if(!region) {
      return of([]);
    }

    return this.httpClient.get<SmallCountry[]>(`${environment.API_URL}/region/${region}?fields=cca3,name,borders`).pipe(
      take(1),
      map((countries) => {
        return countries.map(country => {
          return {
            name: (country.name as any).common,
            cca3: country.cca3,
            borders: country.borders,
          };
        });
      })
    );
  }

  
  getCountryByAlphaCode(alphacode: string): Observable<SmallCountry> {
    
    // if(!alphacode) {
    //   return of({} as SmallCountry);
    // }

    return this.httpClient.get<SmallCountry>(`${environment.API_URL}/alpha/${alphacode}?fields=cca3,name,borders`).pipe(
      take(1),
      map((country) => {
        return {
          name: (country.name as any).common,
          cca3: country.cca3,
          borders: country.borders,
        };
      })
    );
  }

  getCountryBordersCodes(borders: string[]): Observable<SmallCountry[]>  {
    
    if (!borders || borders.length === 0) {
      return of([]);
    }
    
    const requests = borders.map(border => this.getCountryByAlphaCode(border));
    return forkJoin(requests);
    
    // const countryRequests: Observable<SmallCountry>[] = [];
    // borders.map(border =>  {
    //   const req = this.getCountryByAlphaCode(border);
    //   countryRequests.push(req);
    // });
    
    // return combineLatest(countryRequests)
  }

}
