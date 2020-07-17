import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'shared/services/user.service';

import { User } from './../../../shared/models/user';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  isLoading = true;

  displayedColumns: string[] = [
    'id',
    'firstName',
    'email',
    'phone',
    'roles',
    'actions',
  ];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private userService: UserService,
    public media: MediaObserver,
    private toastr: ToastrService
  ) {}

  async ngOnInit() {
    try {
      this.users = await this.userService.getAll();
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } catch (err) {
      this.toastr.error(err.error);
    } finally {
      this.isLoading = false;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
