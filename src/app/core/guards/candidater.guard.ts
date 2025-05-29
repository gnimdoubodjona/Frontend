import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { CandidaterService } from '../../services/candidater.service';
import { Observable } from 'rxjs';

// export class CandidaterGuard implements CanActivate{
//   constructor(private router : Router, private candidater: CandidaterService) {}

//   canActivate(): Observable <boolean> {
//     return;
//   }
// };
