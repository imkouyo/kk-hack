import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyRecommendComponent } from './daily-recommend.component';

describe('DailyRecommendComponent', () => {
  let component: DailyRecommendComponent;
  let fixture: ComponentFixture<DailyRecommendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyRecommendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyRecommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
