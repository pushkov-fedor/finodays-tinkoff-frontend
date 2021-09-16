import { Component } from '@angular/core';
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

  userPrediction: Predict[] = [];
  userPredictTop3: Predict[] = [];
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
          this.userPrediction = (
            JSON.parse(`[
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
            },
            {
              "category": "Связь/Телеком",
              "id": "5",
              "month": "1",
              "predicted_sum": "3362.7999711917655",
              "real_sum": "0.0"
            },
            {
              "category": "Топливо",
              "id": "5",
              "month": "1",
              "predicted_sum": "2574.4732389187675",
              "real_sum": "0.0"
            },
            {
              "category": "Финансовые услуги",
              "id": "5",
              "month": "1",
              "predicted_sum": "20431.63235930131",
              "real_sum": "12100.0"
            },
            {
              "category": "Авиабилеты",
              "id": "5",
              "month": "1",
              "predicted_sum": "12084.960539826583",
              "real_sum": "0.0"
            },
            {
              "category": "Сувениры",
              "id": "5",
              "month": "1",
              "predicted_sum": "0.0",
              "real_sum": "0.0"
            },
            {
              "category": "Фаст Фуд",
              "id": "5",
              "month": "1",
              "predicted_sum": "0.0",
              "real_sum": "0.0"
            },
            {
              "category": "Дом/Ремонт",
              "id": "5",
              "month": "1",
              "predicted_sum": "0.0",
              "real_sum": "0.0"
            },
            {
              "category": "Сервисные услуги",
              "id": "5",
              "month": "1",
              "predicted_sum": "0.0",
              "real_sum": "0.0"
            },
            {
              "category": "Красота",
              "id": "5",
              "month": "1",
              "predicted_sum": "0.0",
              "real_sum": "0.0"
            },
            {
              "category": "Медицинские услуги",
              "id": "5",
              "month": "1",
              "predicted_sum": "0.0",
              "real_sum": "0.0"
            },
            {
              "category": "Одежда/Обувь",
              "id": "5",
              "month": "1",
              "predicted_sum": "0.0",
              "real_sum": "3916.83"
            },
            {
              "category": "Частные услуги",
              "id": "5",
              "month": "1",
              "predicted_sum": "0.0",
              "real_sum": "0.0"
            },
            {
              "category": "Рестораны",
              "id": "5",
              "month": "1",
              "predicted_sum": "0.0",
              "real_sum": "0.0"
            },
            {
              "category": "Развлечения",
              "id": "5",
              "month": "1",
              "predicted_sum": "0.0",
              "real_sum": "0.0"
            },
            {
              "category": "НКО",
              "id": "5",
              "month": "1",
              "predicted_sum": "0.0",
              "real_sum": "0.0"
            },
            {
              "category": "Книги",
              "id": "5",
              "month": "1",
              "predicted_sum": "0.0",
              "real_sum": "0.0"
            },
            {
              "category": "Кино",
              "id": "5",
              "month": "1",
              "predicted_sum": "0.0",
              "real_sum": "0.0"
            },
            {
              "category": "Автоуслуги",
              "id": "5",
              "month": "1",
              "predicted_sum": "0.0",
              "real_sum": "0.0"
            },
            {
              "category": "Музыка",
              "id": "5",
              "month": "1",
              "predicted_sum": "0.0",
              "real_sum": "0.0"
            },
            {
              "category": "Отели",
              "id": "5",
              "month": "1",
              "predicted_sum": "0.0",
              "real_sum": "0.0"
            },
            {
              "category": "Аптеки",
              "id": "5",
              "month": "1",
              "predicted_sum": "0.0",
              "real_sum": "0.0"
            },
            {
              "category": "Цветы",
              "id": "5",
              "month": "1",
              "predicted_sum": "0.0",
              "real_sum": "0.0"
            },
            {
              "category": "Ж/д билеты",
              "id": "5",
              "month": "1",
              "predicted_sum": "0.0",
              "real_sum": "0.0"
            },
            {
              "category": "Спорттовары",
              "id": "5",
              "month": "1",
              "predicted_sum": "0.0",
              "real_sum": "0.0"
            },
            {
              "category": "Госсборы",
              "id": "5",
              "month": "1",
              "predicted_sum": "0.0",
              "real_sum": "0.0"
            },
            {
              "category": "Аренда авто",
              "id": "5",
              "month": "1",
              "predicted_sum": "0.0",
              "real_sum": "0.0"
            },
            {
              "category": "Животные",
              "id": "5",
              "month": "1",
              "predicted_sum": "0.0",
              "real_sum": "0.0"
            },
            {
              "category": "Duty Free",
              "id": "5",
              "month": "1",
              "predicted_sum": "0.0",
              "real_sum": "0.0"
            },
            {
              "category": "Турагентства",
              "id": "5",
              "month": "1",
              "predicted_sum": "0.0",
              "real_sum": "0.0"
            },
            {
              "category": "Образование",
              "id": "5",
              "month": "1",
              "predicted_sum": "0.0",
              "real_sum": "0.0"
            },
            {
              "category": "Искусство",
              "id": "5",
              "month": "1",
              "predicted_sum": "0.0",
              "real_sum": "0.0"
            },
            {
              "category": "Фото/Видео",
              "id": "5",
              "month": "1",
              "predicted_sum": "0.0",
              "real_sum": "0.0"
            }
          ]`) as Predict[]
          ).sort(
            (p1, p2) => Number(p2.predicted_sum) - Number(p1.predicted_sum)
          );
          this.userPredictTop3 = this.userPrediction.slice(0, 3);
          console.log(this.userPredictTop3);
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
