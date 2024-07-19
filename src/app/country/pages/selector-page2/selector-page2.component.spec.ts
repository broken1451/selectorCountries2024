import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorPage2Component } from './selector-page2.component';

describe('SelectorPage2Component', () => {
  let component: SelectorPage2Component;
  let fixture: ComponentFixture<SelectorPage2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectorPage2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectorPage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
