import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductshopComponent } from './productshop.component';

describe('ProductshopComponent', () => {
  let component: ProductshopComponent;
  let fixture: ComponentFixture<ProductshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductshopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
