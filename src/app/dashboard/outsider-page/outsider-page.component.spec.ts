import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutsiderPageComponent } from './outsider-page.component';

describe('OutsiderPageComponent', () => {
  let component: OutsiderPageComponent;
  let fixture: ComponentFixture<OutsiderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutsiderPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutsiderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
