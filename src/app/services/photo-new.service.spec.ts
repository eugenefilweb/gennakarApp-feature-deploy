import { TestBed } from '@angular/core/testing';

import { PhotoNewService } from './photo-new.service';

describe('PhotoNewService', () => {
  let service: PhotoNewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoNewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
