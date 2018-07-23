import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetamaskNotLoggedInComponent } from './metamask-not-logged-in.component';

describe('MetamaskNotLoggedInComponent', () => {
  let component: MetamaskNotLoggedInComponent;
  let fixture: ComponentFixture<MetamaskNotLoggedInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetamaskNotLoggedInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetamaskNotLoggedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
