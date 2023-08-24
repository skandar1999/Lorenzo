import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeallproductsComponent } from './listeallproducts.component';

describe('ListeallproductsComponent', () => {
  let component: ListeallproductsComponent;
  let fixture: ComponentFixture<ListeallproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeallproductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeallproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
