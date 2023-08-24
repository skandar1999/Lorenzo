import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularShop';

constructor(private authService: AuthService) {}

ngOnInit() {
  // Initialize AuthService and load token on app startup
  this.authService.loadToken();
}
}