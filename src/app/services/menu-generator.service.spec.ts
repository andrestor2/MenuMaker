import { TestBed } from '@angular/core/testing';

import { MenuGeneratorService } from './menu-generator.service';

describe('MenuGeneratorService', () => {
  let service: MenuGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
