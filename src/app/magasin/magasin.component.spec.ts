import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagasinComponent } from './magasin.component';

describe('MagasinComponent', () => {
  let component: MagasinComponent;
  let fixture: ComponentFixture<MagasinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MagasinComponent]
    });
    fixture = TestBed.createComponent(MagasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
