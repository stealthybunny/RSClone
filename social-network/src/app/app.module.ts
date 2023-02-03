import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    MainPageComponent,
    NotFoundComponent,
    LoginModalComponent,
    RegisterModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
