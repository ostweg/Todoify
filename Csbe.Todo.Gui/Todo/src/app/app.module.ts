import { BrowserModule } from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from'@angular/common/http';

const routes:Routes = [
  {path: 'signup', component: SignupComponent},
  {path:'signin', component:SigninComponent},
  {path:'', component:SigninComponent},
  {path:'**', redirectTo:'signin', pathMatch:'full'}
];
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {enableTracing:false}),
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
