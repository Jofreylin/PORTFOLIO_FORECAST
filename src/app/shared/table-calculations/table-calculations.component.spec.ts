import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCalculationsComponent } from './table-calculations.component';

describe('TableCalculationsComponent', () => {
  let component: TableCalculationsComponent;
  let fixture: ComponentFixture<TableCalculationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableCalculationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableCalculationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
