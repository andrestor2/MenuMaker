import { TestBed } from '@angular/core/testing';

import { FileGenerationService } from './file-generation.service';

describe('FileGenerationService', () => {
  let service: FileGenerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileGenerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
