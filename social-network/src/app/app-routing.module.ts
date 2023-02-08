import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { FindComponent } from './pages/find/find.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserPageComponent } from './pages/user-page/user-page.component';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'auth/login', component: LoginModalComponent},
  {path: 'auth/registration', component: RegisterModalComponent},
  {path: 'user/:id', component: UserPageComponent},
  {path: 'find', component: FindComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
