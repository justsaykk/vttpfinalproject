import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { take } from "rxjs";

export const authGuard = () => {
    const authSvc = inject(AuthService)
    const router = inject(Router)
    authSvc.authState$.subscribe(
      (user) => {
        if (!user) {
          router.navigate(['/login']);
          return false;
        }
        return true
      }
    ).unsubscribe()
  };