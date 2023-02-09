import { IChat, IToken, IMessage } from './../../../models/types';
import { ChatsService } from './../../../services/chats.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent implements OnInit {
  chatSubs!: Observable<IChat[]>;
  userLofinInfo = JSON.parse(
    window.localStorage.getItem('RSClone-socnetwork') as string
  ) as IToken;
  constructor(private chatsService: ChatsService) {}

  ngOnInit(): void {
    this.chatSubs = this.chatsService.getChats();
  }

  getUserName(chat: IChat) {
    return chat.users[0]._id == this.userLofinInfo._id
      ? {
          name: chat.users[1].name,
          imgLink: `http://localhost:5000/${chat.users[1].avatar.imgLink}`,
        }
      : {
          name: chat.users[0].name,
          imgLink: `http://localhost:5000/${chat.users[0].avatar.imgLink}`,
        };
  }

  getLastMessage(chat: IChat) {
    return chat.messages.length
      ? (chat.messages.at(-1) as IMessage)
      : { text: 'пока нет сообщений', date: new Date() };
  }
}