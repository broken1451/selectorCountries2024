import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Region, SmallCountry } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page2',
  templateUrl: './selector-page2.component.html',
  styleUrl: './selector-page2.component.scss'
})
export class SelectorPage2Component implements OnInit {
  public myForm: FormGroup = this.fb.group({
    region: ['', [Validators.required]],
    country: ['', [Validators.required]],
    border: ['', [Validators.required]],
  }); 

  public countryByRegion: SmallCountry[] = [];
  public boarders: SmallCountry[] = [];

  get formsValues() {
    return this.myForm.controls;
  }


  get regions(): Region[] {
    return this.countryService.regions;
  }

  constructor(private fb: FormBuilder, private countryService: CountryService) { }

  ngOnInit(): void { }

  onRegionChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.countryService.getCountriesByRegion(value).pipe(
      tap(() => this.formsValues['country'].setValue('')),
      switchMap(() => this.countryService.getCountriesByRegion(value))
    ).subscribe(countries => {
      this.countryByRegion = Object.assign([], countries);
    });
  }

  onCountryChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.countryService.getCountryByAlphaCode(value).pipe( 
      tap(() => this.formsValues['border'].setValue('')),
      filter(value =>  {
        return value.cca3.length > 0
      }),
      switchMap(country => { 
        return this.countryService.getCountryBordersCodes(country.borders)
      })
    ).subscribe(country => {
      this.boarders = Object.assign([], country);
    });
  }
}
