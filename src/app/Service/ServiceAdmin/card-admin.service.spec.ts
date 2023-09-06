import { TestBed } from '@angular/core/testing';

import { CardAdminService } from './card-admin.service';

describe('CardAdminService', () => {
  let service: CardAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
