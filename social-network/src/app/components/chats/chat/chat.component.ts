import { IChat } from './../../../models/types';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventSourcePolyfill } from 'ng-event-source';
import { SseService } from 'src/app/services/sse.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  chat!: IChat;
  //eventSource = new EventSourcePolyfill(`http://localhost:5000/chats/sse/${this.chat._id}`, {headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiX2lkIjoiNjNlMjEzNmFkY2RmNmRhODYwNzQyOTI5IiwiaWF0IjoxNjc1NzY2ODE5LCJleHAiOjE2NzU4NTMyMTl9.n1oBRJUv9nsL9x7tplWVWit1zDjxuNdG0xxofZrTrGM' }});
  // eventSource = new EventSource(
  //   'http://localhost:5000/chats/sse/63e2316edcdf6da86074296d'
  // );
  constructor(private route: ActivatedRoute, private sseService: SseService) {}
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      console.log(data);
      this.chat = data['data'];
    });
    this.sseService
      .getServerSentEvent(
        'http://localhost:5000/chats/sse/63e2316edcdf6da86074296d'
      )
      .subscribe((data) => (this.chat = JSON.parse(data.data)));
  }

  // eventSourceHandler() {
  //   this.eventSource.onmessage = ({ data }) => {
  //     console.log(JSON.parse(data));
  //     this.chat = JSON.parse(data);
  //   };
  // }
}
