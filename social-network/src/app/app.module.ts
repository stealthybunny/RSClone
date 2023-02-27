import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginServiceService } from './services/login-service.service';
import { LoginErrorComponent } from './components/login-error/login-error.component';
import { HeaderComponent } from './components/header/header.component';
import { ChatListComponent } from './components/chats/chat-list/chat-list.component';
import { ChatComponent } from './components/chats/chat/chat.component';
import { AsideComponent } from './components/aside/aside.component';
import { HeaderModalComponent } from './components/header-modal/header-modal.component';
import { FindComponent } from './pages/find/find.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { GalleryPageComponent } from './components/gallery/gallery-page/gallery-page.component';
import { GalleryModalComponent } from './components/gallery/gallery-modal/gallery-modal.component';
import { GalleryImageComponent } from './components/gallery/gallery-image/gallery-image.component';
import { AvatarModalComponent } from './components/avatar-modal/avatar-modal.component';
import { GalleryPreviewComponent } from './components/gallery/gallery-preview/gallery-preview.component';
import { PostUploadComponent } from './components/post-upload/post-upload.component';
import { AvatarChangeMenuComponent } from './components/avatar-change-menu/avatar-change-menu.component';
import { NewsComponent } from './components/posts/news/news.component';
import { CommentsComponent } from './components/comments/comments.component';
import { SubscribtionsComponent } from './components/subscribtions/subscribtions.component';
import { SubscriptionsModalComponent } from './components/subscriptions-modal/subscriptions-modal.component';
import { SubscribersComponent } from './components/subscribers/subscribers.component';
import { SubscribersModalComponent } from './components/subscribers-modal/subscribers-modal.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NotFoundComponent,
    LoginModalComponent,
    RegisterModalComponent,
    LoginErrorComponent,
    HeaderComponent,
    ChatListComponent,
    ChatComponent,
    AsideComponent,
    HeaderModalComponent,
    FindComponent,
    UserPageComponent,
    GalleryPageComponent,
    GalleryModalComponent,
    GalleryImageComponent,
    AvatarModalComponent,
    GalleryPreviewComponent,
    PostUploadComponent,
    AvatarChangeMenuComponent,
    NewsComponent,
    CommentsComponent,
    SubscribtionsComponent,
    SubscriptionsModalComponent,
    SubscribersComponent,
    SubscribersModalComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [LoginServiceService, HeaderComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
