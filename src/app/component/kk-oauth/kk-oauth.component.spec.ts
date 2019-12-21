import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KkOauthComponent } from './kk-oauth.component';

describe('KkOauthComponent', () => {
  let component: KkOauthComponent;
  let fixture: ComponentFixture<KkOauthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KkOauthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KkOauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
