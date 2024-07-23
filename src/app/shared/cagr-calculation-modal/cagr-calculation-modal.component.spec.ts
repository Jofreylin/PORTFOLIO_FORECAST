import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CagrCalculationModalComponent } from './cagr-calculation-modal.component';

describe('CagrCalculationModalComponent', () => {
  let component: CagrCalculationModalComponent;
  let fixture: ComponentFixture<CagrCalculationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CagrCalculationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CagrCalculationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
