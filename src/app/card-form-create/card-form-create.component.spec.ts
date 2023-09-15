import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFormCreateComponent } from './card-form-create.component';

describe('CardFormCreateComponent', () => {
  let component: CardFormCreateComponent;
  let fixture: ComponentFixture<CardFormCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardFormCreateComponent]
    });
    fixture = TestBed.createComponent(CardFormCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
