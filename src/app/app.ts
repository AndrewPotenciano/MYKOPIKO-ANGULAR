import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoogleApi, UserInfo } from '@shared/services';

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
  private readonly google = inject(GoogleApi);
  constructor() {
    this.google.userProfileSubject.subscribe( info => {
      this.userInfo = info;
    });
  }



  isLoggedIn( ): boolean {
    return this.google.isLoggedIn();
}
  SignOut(): void {
    this.google.SignOut();
  }
}
