import { Injectable } from '@angular/core';
import { Client, IMessage, IStompSocket } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private client: Client;
  private statusSubject: Subject<any>;

  constructor() {
    this.client = new Client();
    this.client.webSocketFactory = () => new SockJS('http://localhost:8080/socket') as IStompSocket;
    this.statusSubject = new Subject<any>();

    this.client.onConnect = () => {
      console.log('Connected to WebSocket');
      this.client.subscribe('/topic/notification', (message: IMessage) => {
        console.log('Received message:', message.body);
        this.statusSubject.next(JSON.parse(message.body));
      });
    };

    this.client.onStompError = (frame) => {
      console.error('Broker reported error:', frame.headers['message']);
      console.error('Additional details:', frame.body);
    };

    this.client.onWebSocketError = (event) => {
      console.error('WebSocket error:', event);
    };

    this.client.activate();
  }

  public getStatusUpdates(): Observable<any> {
    return this.statusSubject.asObservable();
  }
}
