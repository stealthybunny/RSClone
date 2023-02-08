import { IChat } from './../models/types';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SseService {
  eventSource!: EventSource;
  constructor(private _zone: NgZone) {}

  getServerSentEvent(url: string): Observable<any> {
    return Observable.create(
      (observer: {
        next: (arg0: MessageEvent<any>) => void;
        error: (arg0: Event) => void;
      }) => {
        this.eventSource = this.getEventSource(url);

        this.eventSource.onmessage = (event) => {
          this._zone.run(() => {
            console.log('test');
            observer.next(event);
          });
        };

        this.eventSource.onerror = (error) => {
          this._zone.run(() => {
            observer.error(error);
          });
        };
      }
    );
  }
  closeEventSourse() {
    this.eventSource.close();
  }
  private getEventSource(url: string): EventSource {
    return new EventSource(url);
  }
}
