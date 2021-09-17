import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TransactionAnalizerService } from 'src/app/core/transaction-analizer.service';
import { Predict } from 'src/app/models/predict.model';
import { UserMetrics } from 'src/app/models/user-metrics.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.scss'],
})
export class PredictionComponent {
  constructor(private transactionAnalizerService: TransactionAnalizerService) {}

  userIdControl = new FormControl('', [Validators.required]);
  users: User[] = [];
  usersOptions: User[] = [];

  pageIndex = 0;
  usersPerPage = 30;

  userMetrics: UserMetrics;

  ngOnInit() {
    this.transactionAnalizerService.getAllUsers().subscribe((users) => {
      this.users = users;
      this.usersOptions = this.getUsersOptions();
    });
    this.userIdControl.valueChanges.subscribe((value) => {
      this.pageIndex = 0;
      this.usersOptions = this.getUsersOptions(value);
    });
  }

  onPredict() {
    this.transactionAnalizerService
      .getUserMetrics(this.userIdControl.value)
      .subscribe((metrics) => {
        this.userMetrics = metrics;
      });
  }

  getUsersOptions(value?: string) {
    const searchTerm = value ?? this.userIdControl.value;
    const options = this.users
      .filter((user) => {
        const userPrkStr = String(user.party_rk);
        return userPrkStr.startsWith(searchTerm);
      })
      .slice(0, (this.pageIndex + 1) * this.usersPerPage);
    this.pageIndex++;
    return options;
  }

  onScroll(event) {
    this.usersOptions = this.getUsersOptions();
  }
}
