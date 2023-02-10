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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [LoginServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
