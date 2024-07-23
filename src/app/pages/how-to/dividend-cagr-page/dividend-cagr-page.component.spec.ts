import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividendCagrPageComponent } from './dividend-cagr-page.component';

describe('DividendCagrPageComponent', () => {
  let component: DividendCagrPageComponent;
  let fixture: ComponentFixture<DividendCagrPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DividendCagrPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DividendCagrPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
