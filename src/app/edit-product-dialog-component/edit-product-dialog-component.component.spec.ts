import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductDialogComponentComponent } from './edit-product-dialog-component.component';

describe('EditProductDialogComponentComponent', () => {
  let component: EditProductDialogComponentComponent;
  let fixture: ComponentFixture<EditProductDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProductDialogComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProductDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
