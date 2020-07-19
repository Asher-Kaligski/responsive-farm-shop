import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  isLoading = false;
  constructor(
    public authService: AuthService,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {}

  async submit(form) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    this.userService
      .create(form.value)
      .then(async (result) => {
        const email = form.value.email;
        const password = form.value.password;
        try {
          await this.authService.login({ email, password });
          this.toastr.success('The account has been created successfully');

          this.router.navigate(['/']);
        } catch (err) {
          this.toastr.error(err.error);
        } finally {
          this.isLoading = false;
        }
      })
      .catch((err) => {
        this.toastr.error(err.error);
        this.isLoading = false;
      });
  }
}
