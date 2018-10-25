import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetamaskNotAllowedNetworkComponent } from './metamask-not-allowed-network.component';

describe('MetamaskNotAllowedNetworkComponent', () => {
  let component: MetamaskNotAllowedNetworkComponent;
  let fixture: ComponentFixture<MetamaskNotAllowedNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetamaskNotAllowedNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetamaskNotAllowedNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
