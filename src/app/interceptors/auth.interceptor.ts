import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    console.log('URL interceptée:', request.url);
    console.log('Token brut:', token);
    
    if (token) {
      console.log('Token trouvé, ajout aux en-têtes');
      const authHeader = `Bearer ${token}`;
      console.log('En-tête Authorization:', authHeader);
      
      const cloned = request.clone({
        headers: request.headers.set('Authorization', authHeader)
      });
      
      console.log('En-têtes de la requête:', cloned.headers.keys());
      console.log('Valeur de l\'en-tête Authorization:', cloned.headers.get('Authorization'));
      
      return next.handle(cloned).pipe(
        tap({
          next: (event) => {},
          error: (error) => {
            if (error instanceof HttpErrorResponse) {
              console.error('Erreur HTTP:', error.status, error.message);
              if (error.status === 401) {
                console.error('Erreur 401 - Token invalide ou expiré:', error);
                console.error('En-têtes de la requête qui a échoué:', cloned.headers.keys());
              }
            }
          }
        })
      );
    } else {
      console.warn('Pas de token trouvé pour la requête:', request.url);
    }
    
    return next.handle(request);
  }
}
