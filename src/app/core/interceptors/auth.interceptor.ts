import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Obtener el token del session storage
  const token = sessionStorage.getItem('token');

  // 2. Si existe, clonar la petición y pegarle el token en la cabecera
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  // 3. Si no hay token, dejar pasar la petición tal cual (para login/registro)
  return next(req);
};