import { TestBed, async, inject } from '@angular/core/testing';

import { CerveceroGuard } from './cervecero.guard';

describe('CerveceroGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CerveceroGuard]
    });
  });

  it('should ...', inject([CerveceroGuard], (guard: CerveceroGuard) => {
    expect(guard).toBeTruthy();
  }));
});
