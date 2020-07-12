import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLoading = false;
  isValid = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public async login(form) {
    this.isLoading = true;
    try {
      await this.authService.login(form.value);

      if (!this.authService.isLogged()) {
        this.router.navigate(['/login']);
      }

      const returnUrl = this.activatedRoute.snapshot.queryParamMap.get(
        'returnUrl'
      );
      this.router.navigate([returnUrl || '/']);
    } catch (e) {
      this.isValid = false;
      this.isLoading = false;
      console.error('Unable to Login!\n', e);
    }
  }
}
