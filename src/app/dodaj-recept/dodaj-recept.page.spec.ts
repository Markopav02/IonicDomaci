import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DodajReceptPage } from './dodaj-recept.page';

describe('DodajReceptPage', () => {
  let component: DodajReceptPage;
  let fixture: ComponentFixture<DodajReceptPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajReceptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
