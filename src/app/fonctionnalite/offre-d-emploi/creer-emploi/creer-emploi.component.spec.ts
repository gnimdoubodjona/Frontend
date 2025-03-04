import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerEmploiComponent } from './creer-emploi.component';

describe('CreerEmploiComponent', () => {
  let component: CreerEmploiComponent;
  let fixture: ComponentFixture<CreerEmploiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreerEmploiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreerEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
