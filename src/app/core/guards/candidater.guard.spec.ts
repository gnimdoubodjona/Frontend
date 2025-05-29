import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { candidaterGuard } from './candidater.guard';

describe('candidaterGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => candidaterGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
