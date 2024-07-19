import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Region, SmallCountry } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrl: './selector-page.component.scss'
})
export class SelectorPageComponent implements OnInit {

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

  ngOnInit(): void {
    this.onRegionChange();
    this.onCountryChange();
  }

  onRegionChange() {
    this.myForm.get('region')?.valueChanges.pipe(
      tap(() => this.formsValues['country'].setValue('')),
      tap(() => this.boarders = []),
      switchMap(region => this.countryService.getCountriesByRegion(region))
    ).subscribe(countries => {
       this.countryByRegion = Object.assign([], countries);
    });
  }

  onCountryChange() {
    this.myForm.get('country')?.valueChanges.pipe(
      tap(() => this.formsValues['border'].setValue('')),
      filter(alphaCode =>  {
        return alphaCode.length > 0
      }),
      switchMap(alphaCode => this.countryService.getCountryByAlphaCode(alphaCode)),
      switchMap(country => this.countryService.getCountryBordersCodes(country.borders))
    ).subscribe(country => {
       this.boarders = Object.assign([], country);
    });
  }
}
