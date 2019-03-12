import { BrowserModule } from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from'@angular/common/http';
import { HomeComponent } from './home/home.component';
import { TodoComponent } from './Home/todo/todo.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from '@angular/material';
import { MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { CreateItemComponent } from './create-item/create-item.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatBadgeModule} from '@angular/material/badge';
import {AuthGuardService as AuthGuard}from "./Guard/auth-guard.service";
import {IdentityService as Identity} from "./Guard/identity.service";
import { TodoItemComponent } from './home/todo-item/todo-item.component';

const routes:Routes = [
  {path: 'signup', component: SignupComponent},
  {path:'signin', component:SigninComponent},
  {path:'home',component:HomeComponent,canActivate: [AuthGuard]},
  {path:'', component:SigninComponent},
  {path:'**', redirectTo:'signin', pathMatch:'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    TodoComponent,
    CreateItemComponent,
    TodoItemComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {enableTracing:false}),
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatBadgeModule
  ],
  entryComponents: [CreateItemComponent],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
