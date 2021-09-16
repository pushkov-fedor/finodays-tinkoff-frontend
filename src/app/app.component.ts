import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TransactionAnalizerService } from './core/transaction-analizer.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private transactionAnalizerService: TransactionAnalizerService) {}

  userIdControl = new FormControl('', [Validators.required]);

  users: User[] = [];
  usersOptions: User[] = [];

  ngOnInit() {
    this.transactionAnalizerService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
        this.usersOptions = this.users;
      },
      (error) => {
        this.users = JSON.parse(
          '[{"party_rk":5},{"party_rk":7},{"party_rk":11},{"party_rk":13},{"party_rk":14},{"party_rk":15},{"party_rk":20},{"party_rk":23},{"party_rk":24},{"party_rk":28},{"party_rk":29}]'
        );
        this.usersOptions = this.users;
      }
    );

    this.userIdControl.valueChanges.subscribe((value) => {
      this.usersOptions = this.users.filter((user) => {
        const userPrkStr = String(user.party_rk);
        return userPrkStr.startsWith(value);
      });
    });
  }
}
