import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoogleApi, UserInfo } from './google-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  userInfo?: UserInfo;
  protected readonly title = signal('MYKOPIKO');
  constructor(private readonly google: GoogleApi) {
    google.userProfileSubject.subscribe( info => {
      this.userInfo = info;
    });
  }



  isLoggedIn( ): boolean {
    return this.google.isLoggedIn();
}
  SignOut(){
    this.google.SignOut();
  }
}
