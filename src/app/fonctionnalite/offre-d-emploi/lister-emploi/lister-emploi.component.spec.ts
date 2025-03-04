import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerEmploiComponent } from './lister-emploi.component';

describe('ListerEmploiComponent', () => {
  let component: ListerEmploiComponent;
  let fixture: ComponentFixture<ListerEmploiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListerEmploiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListerEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
