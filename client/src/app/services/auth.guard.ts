import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

export const authGuard = () => {
    const authSvc = inject(AuthService)
    const router = inject(Router)

    let isAuthenticated!: boolean;
    let isAuth$ = authSvc.getIsAuthenticated().subscribe((b) => isAuthenticated = b);
    if (!isAuthenticated) {
      router.navigate(['/login']);
      isAuth$.unsubscribe;
      return false;
    }
    isAuth$.unsubscribe()
    return isAuthenticated
  };