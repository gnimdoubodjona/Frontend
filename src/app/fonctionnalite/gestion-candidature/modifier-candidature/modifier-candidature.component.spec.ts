import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCandidatureComponent } from './modifier-candidature.component';

describe('ModifierCandidatureComponent', () => {
  let component: ModifierCandidatureComponent;
  let fixture: ComponentFixture<ModifierCandidatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifierCandidatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
