import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirCandidatureComponent } from './voir-candidature.component';

describe('VoirCandidatureComponent', () => {
  let component: VoirCandidatureComponent;
  let fixture: ComponentFixture<VoirCandidatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VoirCandidatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoirCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
