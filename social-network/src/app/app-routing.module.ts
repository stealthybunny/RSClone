import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'auth', component: AuthenticationComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
