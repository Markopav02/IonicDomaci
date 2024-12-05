import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AzurirajReceptPage } from './azuriraj-recept.page';

describe('AzurirajReceptPage', () => {
  let component: AzurirajReceptPage;
  let fixture: ComponentFixture<AzurirajReceptPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AzurirajReceptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
