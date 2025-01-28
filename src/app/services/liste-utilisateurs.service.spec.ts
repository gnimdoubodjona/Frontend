import { TestBed } from '@angular/core/testing';

import { ListeUtilisateursService } from './liste-utilisateurs.service';

describe('ListeUtilisateursService', () => {
  let service: ListeUtilisateursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListeUtilisateursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
