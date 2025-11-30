import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../services/login';
import Swal from 'sweetalert2';

export const roleGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService)
  const router = inject(Router)

  // 1. Validar si está logueado
  if (!loginService.verificar()) {
    router.navigate(['/login']);
    return false;
  }

  const currentRole = loginService.getRole();

  // 2. ADMIN SIEMPRE PASA (Modo Dios)
  if (currentRole === 'ADMIN') {
    return true;
  }

  // 3. Obtener roles esperados desde la ruta (ahora esperamos un Array)
  const expectedRoles = route.data['expectedRoles'] as Array<string>;

  // 4. Validar si el rol actual está en la lista permitida
  if (expectedRoles && expectedRoles.includes(currentRole)) {
    return true;
  }

  // 5. Si no tiene permiso, redirigir según su rol para evitar bucles
  if (currentRole === 'PACIENTE') {
    router.navigate(['/diarios']);
  } else if (currentRole === 'ESPECIALISTA') {
    router.navigate(['/usuarios/pacientes']); // Redirigir a su home
  } else {
    router.navigate(['/inicio']);
  }
  
  return false;
};