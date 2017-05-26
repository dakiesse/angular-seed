import { NgModule } from '@angular/core'
import { Route, RouterModule } from '@angular/router'
import { UserListComponent } from './components/user-list/user-list.component'
import { UserDetailComponent } from './components/user-detail/user-detail.component'

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'users', component: UserListComponent },
      { path: 'users/new', component: UserDetailComponent, data: { operation: 'create' } },
      { path: 'users/:id', component: UserDetailComponent, data: { operation: 'update' } },
    ]),
  ],
  exports: [ RouterModule ],
})
export class UserRoutingModule {
}
