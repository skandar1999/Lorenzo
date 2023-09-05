import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeFormulaireComponent } from './commande-formulaire.component';

describe('CommandeFormulaireComponent', () => {
  let component: CommandeFormulaireComponent;
  let fixture: ComponentFixture<CommandeFormulaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandeFormulaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandeFormulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
