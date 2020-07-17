import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
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
    } catch (err) {
      this.isValid = false;
      this.toastr.error(err.error);
    } finally {
      this.isLoading = false;
    }
  }
}
