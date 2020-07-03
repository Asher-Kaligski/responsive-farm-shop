import { TestBed } from '@angular/core/testing';

import { FarmerAuthGuardService } from './farmer-auth-guard.service';

describe('FarmerAuthGuardService', () => {
  let service: FarmerAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FarmerAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
