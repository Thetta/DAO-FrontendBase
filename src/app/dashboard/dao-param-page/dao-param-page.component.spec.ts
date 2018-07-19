import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaoParamPageComponent } from './dao-param-page.component';

describe('DaoParamPageComponent', () => {
  let component: DaoParamPageComponent;
  let fixture: ComponentFixture<DaoParamPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaoParamPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaoParamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
