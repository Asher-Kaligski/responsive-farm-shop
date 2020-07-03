import { UserService } from 'shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {}

  async submit(form) {
    try {
      if (!form.valid) { return; }

      this.userService.create(form.value).then(async (result) => {
        const email = form.value.email;
        const password = form.value.password;

        await this.authService.login({ email, password });

        this.router.navigate(['/']);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
