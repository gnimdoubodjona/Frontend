import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeReponsesComponent } from './liste-reponses.component';

describe('ListeReponsesComponent', () => {
  let component: ListeReponsesComponent;
  let fixture: ComponentFixture<ListeReponsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeReponsesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeReponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
