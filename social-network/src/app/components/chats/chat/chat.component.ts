import { FormGroup, FormControl } from '@angular/forms';
import { IChat } from './../../../models/types';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SseService } from 'src/app/services/sse.service';
import { ChatsService } from 'src/app/services/chats.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  chat!: IChat;
  form!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private sseService: SseService,
    private chatsService: ChatsService
  ) {}
  ngOnDestroy(): void {
    this.sseService.closeEventSourse();
  }
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      console.log(data);
      this.chat = data['data'];
    });
    this.sseService
      .getServerSentEvent(`http://localhost:5000/chats/sse/${this.chat._id}`)
      .subscribe((data) => (this.chat = JSON.parse(data.data)));
    this.form = new FormGroup({
      text: new FormControl(''),
    });
  }

  sendMeassage() {
    console.log(this.form);
    this.chatsService.sendMessage(this.form.value, this.chat._id).subscribe();
  }
}
