import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierEmploiComponent } from './modifier-emploi.component';

describe('ModifierEmploiComponent', () => {
  let component: ModifierEmploiComponent;
  let fixture: ComponentFixture<ModifierEmploiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifierEmploiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
