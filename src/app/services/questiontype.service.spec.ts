import { TestBed } from '@angular/core/testing';

import { QuestiontypeService } from './questiontype.service';

describe('QuestiontypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestiontypeService = TestBed.get(QuestiontypeService);
    expect(service).toBeTruthy();
  });
});
