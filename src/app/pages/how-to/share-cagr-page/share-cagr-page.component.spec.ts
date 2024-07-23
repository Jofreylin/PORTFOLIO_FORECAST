import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareCagrPageComponent } from './share-cagr-page.component';

describe('ShareCagrPageComponent', () => {
  let component: ShareCagrPageComponent;
  let fixture: ComponentFixture<ShareCagrPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShareCagrPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareCagrPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
