import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TransactionAnalizerService } from './core/transaction-analizer.service';
import { Predict } from './models/predict.model';
import { UserMetrics } from './models/user-metrics.model';
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

  userPrediction: Predict[] = [];
  userMetrics: UserMetrics;

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

  onPredict() {
    this.transactionAnalizerService
      .getUserPrediction(this.userIdControl.value)
      .subscribe(
        (predicts) => {
          this.userPrediction = predicts;
        },
        (error) => {
          this.userPrediction = JSON.parse(`[
            {
              "category": "Наличные",
              "id": "5",
              "month": "1",
              "predicted_sum": "7038.789075247338",
              "real_sum": "0.0"
            },
            {
              "category": "Супермаркеты",
              "id": "5",
              "month": "1",
              "predicted_sum": "5344.641952328495",
              "real_sum": "0.0"
            },
            {
              "category": "Разные товары",
              "id": "5",
              "month": "1",
              "predicted_sum": "3988.237690785287",
              "real_sum": "12398.85"
            },
            {
              "category": "Транспорт",
              "id": "5",
              "month": "1",
              "predicted_sum": "3887.8072785855024",
              "real_sum": "6499.0"
            }]`);
        }
      );

    this.transactionAnalizerService
      .getUserMetrics(this.userIdControl.value)
      .subscribe(
        (metrics) => {
          this.userMetrics = metrics;
        },
        (error) => {
          this.userMetrics = JSON.parse(`
            {
              "cashback_category_pred": [
                "Финансовые услуги",
                "Авиабилеты",
                "Наличные"
              ],
              "party_rk": 5,
              "potentional_cashback": 1549,
              "real_cashback": 605
            }
          `);
          console.log(this.userMetrics);
        }
      );
  }
}
