import { ChatsResolver } from './resolvers/chats.resolver';
import { ChatComponent } from './components/chats/chat/chat.component';
import { ChatListComponent } from './components/chats/chat-list/chat-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { FindComponent } from './pages/find/find.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { GalleryPageComponent } from './components/gallery/gallery-page/gallery-page.component';
import { GalleryResolver } from './resolvers/gallery.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { NewsComponent } from './components/posts/news/news.component';

const routes: Routes = [
  // { path: '', component: MainPageComponent },
  { path: 'auth/login', component: LoginModalComponent },
  { path: 'auth/registration', component: RegisterModalComponent },
  {
    path: 'user/:id',
    component: UserPageComponent,
    resolve: { data: UserResolver },
  },
  { path: 'find', component: FindComponent },
  { path: 'chats', component: ChatListComponent },
  {
    path: 'chats/:id',
    component: ChatComponent,
    resolve: { data: ChatsResolver },
  },
  {
    path: 'gallery/:id',
    component: GalleryPageComponent,
    resolve: { data: GalleryResolver },
  },
  {
    path: 'news',
    component: NewsComponent,
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
