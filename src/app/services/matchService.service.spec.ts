/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MatchServiceService } from './matchService.service';

describe('Service: MatchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchServiceService]
    });
  });

  it('should ...', inject([MatchServiceService], (service: MatchServiceService) => {
    expect(service).toBeTruthy();
  }));
});
