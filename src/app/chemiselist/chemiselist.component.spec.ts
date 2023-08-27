import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CHEMISElistComponent } from './chemiselist.component';

describe('CHEMISElistComponent', () => {
  let component: CHEMISElistComponent;
  let fixture: ComponentFixture<CHEMISElistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CHEMISElistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CHEMISElistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
