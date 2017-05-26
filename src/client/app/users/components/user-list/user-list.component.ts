import { Component, OnInit } from '@angular/core'
import { UserService } from '../../../shared/api/user/user.service'
import { User } from '../../../models/user.model'
import { Observable } from 'rxjs/Observable'
import { Router } from '@angular/router'

@Component({
  moduleId: module.id,
  selector: 'sd-user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: [ 'user-list.component.css' ],
})
export class UserListComponent implements OnInit {
  public users: Observable<User[]>

  constructor (private _router: Router, private _userService: UserService) {
  }

  ngOnInit () {
    this.loadUsers()
  }

  onRemove (id: number): void {
    this._userService.remove(id).subscribe(
      () => this.loadUsers(),
    )
  }

  private loadUsers () {
    this.users = this._userService.list()
  }
}
