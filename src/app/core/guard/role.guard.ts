import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../services/login';

export const roleGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService)
  const router = inject(Router)

  if (!loginService.verificar()) {
    router.navigate(['/login'])
    return false
  }

  const currentRole = loginService.getRole()
  if (currentRole === 'ADMIN') {
    return true
  }
  
  const expectedRole = route.data['expectedRole']

  if (!expectedRole) {
    return true
  }

  if (currentRole === expectedRole) {
    return true
  }

  router.navigate(['/diarios'])
  return false
};