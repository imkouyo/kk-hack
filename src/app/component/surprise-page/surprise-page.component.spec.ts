import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurprisePageComponent } from './surprise-page.component';

describe('SurprisePageComponent', () => {
  let component: SurprisePageComponent;
  let fixture: ComponentFixture<SurprisePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurprisePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurprisePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
