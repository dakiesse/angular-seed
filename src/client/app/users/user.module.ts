import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserRoutingModule } from './user-routing.module'
import { UserContainerComponent } from './components/user-container/user-container.component'
import { UserListComponent } from './components/user-list/user-list.component'
import { UserDetailComponent } from './components/user-detail/user-detail.component'
import { SharedModule } from '../shared/shared.module'
import { UserMapComponent } from './components/user-map/user-map.component'
import { FormsModule } from '@angular/forms'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    SharedModule,
  ],
  declarations: [
    UserContainerComponent,
    UserListComponent,
    UserDetailComponent,
    UserMapComponent,
  ],
  exports: [
    UserContainerComponent,
  ],
})
export class UserModule {
}
