import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ServiceService } from 'src/common/service.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(  private common: ServiceService,
    private router: Router,
    private toastr: ToastrService){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.common.isLoggedIn()) {
      return true;
    } else {
      this.toastr.warning('Please log in first.', 'Access Denied'); // Show warning message
      return this.router.createUrlTree(['/login']); // Redirect to login page using UrlTree
    }
  }
}