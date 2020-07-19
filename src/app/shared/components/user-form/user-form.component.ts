import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { User } from './../../models/user';
import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  user: User;
  isAdmin = false;
  userId: string;
  rolesList: string[] = ['CUSTOMER', 'FARM_OWNER'];
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    public authService: AuthService
  ) {}

  async ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.user = await this.userService.getUserById(this.userId);

    if (this.router.url.includes('admin')) this.isAdmin = true;
  }

  async submit(form) {
    if (!form.valid) return;
    this.isLoading = true;
    try {
      await this.userService.updateUser(form.value, this.userId);

      this.toastr.success('User details have been updated successfully');

      if (this.isAdmin) this.router.navigate(['/admin/users']);
      else {
        const email = form.value.email;
        const password = form.value.password;
        await this.authService.login({ email, password });
        this.router.navigate(['/']);
      }
    } catch (err) {
      this.toastr.error(err.error);
    } finally {
      this.isLoading = false;
    }
  }

  cancel() {
    if (this.isAdmin) this.router.navigate(['/admin/users']);
    else this.router.navigate(['/']);
  }
}
