import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataClientService } from './data-client.service';

describe('DataClientService', () => {
  let service: DataClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DataClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
