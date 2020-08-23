import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardAdmin } from './admin-auth.guard';



describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardAdmin]
    });
  });

  it('should ...', inject([AuthGuardAdmin], (guard: AuthGuardAdmin) => {
    expect(guard).toBeTruthy();
  }));
});
