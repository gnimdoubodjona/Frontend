import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulerEmploiComponent } from './postuler-emploi.component';

describe('PostulerEmploiComponent', () => {
  let component: PostulerEmploiComponent;
  let fixture: ComponentFixture<PostulerEmploiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostulerEmploiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostulerEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
