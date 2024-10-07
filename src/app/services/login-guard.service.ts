import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({providedIn: 'root'})
export class LoginGuardService implements CanActivate {
  constructor(
    private storage: LocalStorageService,
    private router: Router
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    if (this.storage.get("key") == null) {
      this.router.navigate(['login']);
    }
    return true;
  }
}