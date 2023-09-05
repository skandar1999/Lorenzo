import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-commande-liste',
  templateUrl: './commande-liste.component.html',
  styleUrls: ['./commande-liste.component.css']
})
export class CommandeListeComponent implements OnInit {

  constructor(  public authService: AuthService) { }

  ngOnInit(): void {
  }
  onLogout() {
    this.authService.logout();
  }
}
