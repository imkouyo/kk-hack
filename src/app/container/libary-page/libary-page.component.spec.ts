import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibaryPageComponent } from './libary-page.component';

describe('LibaryPageComponent', () => {
  let component: LibaryPageComponent;
  let fixture: ComponentFixture<LibaryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibaryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibaryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
