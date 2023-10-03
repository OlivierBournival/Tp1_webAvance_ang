import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { AuthentificationService } from './services/authentification.service';
import { inject } from '@angular/core';

export const authGuardGuard: CanActivateFn = (route, state) => {
  if (!inject(AuthentificationService).login)
    return createUrlTreeFromSnapshot(route, ['/login']);
  else return true;
};
