import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToSharePriceCagrComponent } from './how-to-share-price-cagr.component';

describe('HowToSharePriceCagrComponent', () => {
  let component: HowToSharePriceCagrComponent;
  let fixture: ComponentFixture<HowToSharePriceCagrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HowToSharePriceCagrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowToSharePriceCagrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
