import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FarmerAuthGuard {

  constructor(private router: Router, private authService: AuthService) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const user = this.authService.currentUser;
    if (user && user.roles.includes('FARM_OWNER')) { return true; }

    this.router.navigate(['/no-access']);
    return false;
  }
}
