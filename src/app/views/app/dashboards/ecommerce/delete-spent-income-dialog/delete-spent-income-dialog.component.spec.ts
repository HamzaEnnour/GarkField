import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSpentIncomeDialogComponent } from './delete-spent-income-dialog.component';

describe('DeleteSpentIncomeDialogComponent', () => {
  let component: DeleteSpentIncomeDialogComponent;
  let fixture: ComponentFixture<DeleteSpentIncomeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSpentIncomeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSpentIncomeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
