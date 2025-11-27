import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../services/login';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  // 1. Verificar autenticación básica
  if (!loginService.verificar()) {
    router.navigate(['/login']);
    return false;
  }

  const currentRole = loginService.getRole(); // 'ADMIN' o 'PACIENTE'

  // --- 2. LÓGICA DE "LLAVE MAESTRA" PARA ADMIN ---
  // Si es ADMIN, le permitimos entrar a CUALQUIER ruta protegida por este guard.
  if (currentRole === 'ADMIN') {
    return true; 
  }

  // 3. Verificar permisos para otros usuarios (PACIENTES)
  // Leemos el rol que se EXIGE en la ruta (definido en app.routes.ts)
  const expectedRole = route.data['expectedRole'];

  // Si el rol del usuario coincide con el esperado, pasa.
  if (currentRole === expectedRole) {
    return true;
  }

  // 4. Si llegamos aquí, es un Paciente intentando entrar a una ruta de Admin
  // Lo redirigimos a su zona segura
  router.navigate(['/diarios']); // O '/inicio'
  return false;
};