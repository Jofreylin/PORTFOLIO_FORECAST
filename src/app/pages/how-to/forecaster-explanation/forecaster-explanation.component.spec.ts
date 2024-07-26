import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecasterExplanationComponent } from './forecaster-explanation.component';

describe('ForecasterExplanationComponent', () => {
  let component: ForecasterExplanationComponent;
  let fixture: ComponentFixture<ForecasterExplanationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForecasterExplanationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecasterExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
