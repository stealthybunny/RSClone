import { FormGroup, FormControl } from '@angular/forms';
import { IChat, IMessage, IToken, IUser } from './../../../models/types';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SseService } from 'src/app/services/sse.service';
import { ChatsService } from 'src/app/services/chats.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {
  chat!: IChat;
  form!: FormGroup;
  userLofinInfo = JSON.parse(
    window.localStorage.getItem('RSClone-socnetwork') as string
  ) as IToken;
  constructor(
    private route: ActivatedRoute,
    private sseService: SseService,
    private chatsService: ChatsService
  ) {}
  @ViewChildren('messages') messages: QueryList<any>;
  @ViewChild('content') content: ElementRef;
  ngAfterViewInit(): void {
    this.scrollToBottom();
    this.messages.changes.subscribe(this.scrollToBottom);
  }
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
    this.form.reset();
  }

  getImgLink(message: IMessage) {
    return `http://localhost:5000/${message.author.avatar.imgLink}`;
  }

  scrollToBottom = () => {
    try {
      this.content.nativeElement.scrollTop =
        this.content.nativeElement.scrollHeight;
    } catch (err) {}
  };

  getTargetNameAndLink() {
    let user: IUser;
    if (this.chat.users[0]._id == this.userLofinInfo._id) {
      user = this.chat.users[1];
    } else {
      user = this.chat.users[0];
    }
    return {
      name: user.name,
      imgLink: `http://localhost:5000/${user.avatar.imgLink}`,
    };
  }
}
