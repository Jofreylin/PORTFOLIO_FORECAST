import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToDividendCagrComponent } from './how-to-dividend-cagr.component';

describe('HowToDividendCagrComponent', () => {
  let component: HowToDividendCagrComponent;
  let fixture: ComponentFixture<HowToDividendCagrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HowToDividendCagrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowToDividendCagrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
