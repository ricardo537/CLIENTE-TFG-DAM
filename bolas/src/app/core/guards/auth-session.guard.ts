import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { LoginDTO } from '@dto/loginDTO';


@Injectable({
  providedIn: 'root'
})
export class authSessionGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const session = this.getSession();

    if (session !== null) {
      return true;
    } else {
      this.router.navigate(['/bolas/auth/login']);
      return false;
    }
  }

  getSession(): LoginDTO|null {
    const sessionData = sessionStorage.getItem("token");
    if (sessionData) {
      try {
        return JSON.parse(sessionData) as LoginDTO;
      } catch (error) {
        console.error("Error parsing session data", error);
        return null;
      }
    } else {
      return null;
    }
  }
}