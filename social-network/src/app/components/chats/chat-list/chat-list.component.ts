import { IChat } from './../../../models/types';
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
  constructor(private chatsService: ChatsService) {}

  ngOnInit(): void {
    this.chatSubs = this.chatsService.getChats();
  }
}
