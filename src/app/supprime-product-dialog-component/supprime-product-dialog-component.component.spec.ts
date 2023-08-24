import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimeProductDialogComponentComponent } from './supprime-product-dialog-component.component';

describe('SupprimeProductDialogComponentComponent', () => {
  let component: SupprimeProductDialogComponentComponent;
  let fixture: ComponentFixture<SupprimeProductDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupprimeProductDialogComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupprimeProductDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
