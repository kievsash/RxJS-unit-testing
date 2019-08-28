import { TestBed } from '@angular/core/testing';

import { VeryImportantService } from './very-important.service';

describe('VeryImportantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VeryImportantService = TestBed.get(VeryImportantService);
    expect(service).toBeTruthy();
  });
});
