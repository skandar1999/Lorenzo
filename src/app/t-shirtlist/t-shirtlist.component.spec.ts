import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TShirtlistComponent } from './t-shirtlist.component';

describe('TShirtlistComponent', () => {
  let component: TShirtlistComponent;
  let fixture: ComponentFixture<TShirtlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TShirtlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TShirtlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
