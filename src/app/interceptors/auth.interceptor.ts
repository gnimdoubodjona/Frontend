import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private publicRoutes = [
    '/api/categories/',
    '/api/auth/login',
    '/api/auth/register',
    'api/auth/roles',
    'api/auth/disponibilite'
  ];

  constructor(private authService: AuthService) {}

  private isPublicRoute(url: string): boolean {
    return this.publicRoutes.some(route => {
      if (route.includes('/auth/')) {
        return url.includes(route);
      }
      return url === route || url.startsWith(route + '?');
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    
    if (this.isPublicRoute(request.url)) {
      console.log('Route publique détectée:', request.url);
      return next.handle(request);
    }

    if (token) {
      console.log('Ajout du token pour la route:', request.url);
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(authReq);
    }
    
    console.log('Pas de token disponible pour la route:', request.url);
    return next.handle(request);
  }
}
