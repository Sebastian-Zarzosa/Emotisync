import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../services/login';

export const roleGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  // 1. Validar si está logueado
  if (!loginService.verificar()) {
    router.navigate(['/login']);
    return false;
  }

  // 2. Obtener Rol de forma SEGURA
  // Si getRole() es null/undefined, usamos cadena vacía '' para evitar el crash
  const roleRaw = loginService.getRole();
  const currentRole = roleRaw ? roleRaw.trim().toUpperCase() : '';

  if (!currentRole) {
    // Si no hay rol, algo está mal con el token. Mandar al login.
    router.navigate(['/login']);
    return false;
  }

  // 3. ADMIN: Acceso total
  if (currentRole === 'ADMIN') {
    return true;
  }

  // 4. Validar permisos de ruta
  const dataRole = route.data['expectedRoles'] || route.data['expectedRole'];
  
  if (!dataRole) {
    // Si la ruta no tiene roles definidos, asumimos que es pública o error de config
    return true; 
  }

  const allowedRoles = Array.isArray(dataRole) ? dataRole : [dataRole];

  // Comparamos mayúsculas con mayúsculas
  const hasPermission = allowedRoles.some((r: string) => r.toUpperCase() === currentRole);

  if (hasPermission) {
    return true;
  }

  // 5. Redirección Segura (Anti-Bucle)
  let targetUrl = '/inicio';
  if (currentRole === 'PACIENTE') targetUrl = '/diarios';
  else if (currentRole === 'ESPECIALISTA') targetUrl = '/usuarios/pacientes';
  else if (currentRole === 'FAMILIAR') targetUrl = '/progreso';

  // Si ya estoy intentando ir a mi home y no puedo entrar, NO redirigir (evita bucle)
  if (state.url === targetUrl) {
    return false;
  }

  router.navigate([targetUrl]);
  return false;
};