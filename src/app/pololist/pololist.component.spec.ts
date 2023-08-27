import { ComponentFixture, TestBed } from '@angular/core/testing';

import { POLOlistComponent } from './pololist.component';

describe('POLOlistComponent', () => {
  let component: POLOlistComponent;
  let fixture: ComponentFixture<POLOlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ POLOlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(POLOlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
