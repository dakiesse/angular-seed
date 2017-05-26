import { APP_BASE_HREF } from '@angular/common'
import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { BrowserModule } from '@angular/platform-browser'

import { AboutModule } from './about/about.module'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeModule } from './home/home.module'
import { SharedModule } from './shared/shared.module'
import { UserModule } from './users/user.module'


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    AboutModule,
    HomeModule,
    UserModule,
    SharedModule.forRoot(),
  ],
  declarations: [ AppComponent ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '<%= APP_BASE %>' },
  ],
  bootstrap: [ AppComponent ],

})
export class AppModule {
}
