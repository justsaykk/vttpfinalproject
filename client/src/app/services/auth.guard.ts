import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

export const authGuard = () => {
    const authSvc = inject(AuthService)
    const router = inject(Router)
    let isAuthenticated!: boolean;
    authSvc.getIsAuthenticated().subscribe((b) => isAuthenticated = b).unsubscribe();
    if (!isAuthenticated) {
      router.navigate(['/login']);
      return false;
    }
    return isAuthenticated
  };