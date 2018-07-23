import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetamaskNotInstalledComponent } from './metamask-not-installed.component';

describe('MetamaskNotInstalledComponent', () => {
  let component: MetamaskNotInstalledComponent;
  let fixture: ComponentFixture<MetamaskNotInstalledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetamaskNotInstalledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetamaskNotInstalledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
