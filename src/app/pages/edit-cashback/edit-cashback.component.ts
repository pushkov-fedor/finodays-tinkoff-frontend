import { Component, OnInit } from '@angular/core';
import { TransactionAnalizerService } from 'src/app/core/transaction-analizer.service';
import { CashbackSettings } from '../../models/cashback-setting.model';

@Component({
  selector: 'app-edit-cashback',
  templateUrl: './edit-cashback.component.html',
  styleUrls: ['./edit-cashback.component.scss'],
})
export class EditCashbackComponent implements OnInit {
  constructor(private transactionAnalizerService: TransactionAnalizerService) {}

  cashbackSettings: CashbackSettings;

  ngOnInit() {
    this.transactionAnalizerService.getCashbackSettings().subscribe(
      (settings) => (this.cashbackSettings = settings),
      (error) => {
        this.cashbackSettings = JSON.parse(`[
            {
              "cashback": 0.05,
              "id": 1,
              "name": "Финансовые услуги"
            },
            {
              "cashback": 0.05,
              "id": 2,
              "name": "Наличные"
            },
            {
              "cashback": 0.05,
              "id": 3,
              "name": "Разные товары"
            },
            {
              "cashback": 0.05,
              "id": 4,
              "name": "Транспорт"
            },
            {
              "cashback": 0.05,
              "id": 5,
              "name": "Супермаркеты"
            },
            {
              "cashback": 0.05,
              "id": 6,
              "name": "Фаст Фуд"
            },
            {
              "cashback": 0.05,
              "id": 7,
              "name": "Топливо"
            },
            {
              "cashback": 0.05,
              "id": 8,
              "name": "Связь/Телеком"
            },
            {
              "cashback": 0.05,
              "id": 9,
              "name": "Дом/Ремонт"
            },
            {
              "cashback": 0.05,
              "id": 10,
              "name": "Животные"
            },
            {
              "cashback": 0.05,
              "id": 11,
              "name": "Рестораны"
            },
            {
              "cashback": 0.05,
              "id": 12,
              "name": "Сувениры"
            },
            {
              "cashback": 0.05,
              "id": 13,
              "name": "Аренда авто"
            },
            {
              "cashback": 0.05,
              "id": 14,
              "name": "Медицинские услуги"
            },
            {
              "cashback": 0.05,
              "id": 15,
              "name": "Турагентства"
            },
            {
              "cashback": 0.05,
              "id": 16,
              "name": "Спорттовары"
            },
            {
              "cashback": 0.05,
              "id": 17,
              "name": "Аптеки"
            },
            {
              "cashback": 0.05,
              "id": 18,
              "name": "Цветы"
            },
            {
              "cashback": 0.05,
              "id": 19,
              "name": "Госсборы"
            },
            {
              "cashback": 0.05,
              "id": 20,
              "name": "Одежда/Обувь"
            },
            {
              "cashback": 0.05,
              "id": 21,
              "name": "Книги"
            },
            {
              "cashback": 0.05,
              "id": 22,
              "name": "Музыка"
            },
            {
              "cashback": 0.05,
              "id": 23,
              "name": "Красота"
            },
            {
              "cashback": 0.05,
              "id": 24,
              "name": "Сервисные услуги"
            },
            {
              "cashback": 0.05,
              "id": 25,
              "name": "Кино"
            },
            {
              "cashback": 0.05,
              "id": 26,
              "name": "Авиабилеты"
            },
            {
              "cashback": 0.05,
              "id": 27,
              "name": "Частные услуги"
            },
            {
              "cashback": 0.05,
              "id": 28,
              "name": "Развлечения"
            },
            {
              "cashback": 0.05,
              "id": 29,
              "name": "НКО"
            },
            {
              "cashback": 0.05,
              "id": 30,
              "name": "Автоуслуги"
            },
            {
              "cashback": 0.05,
              "id": 31,
              "name": "Отели"
            },
            {
              "cashback": 0.05,
              "id": 32,
              "name": "Ж/д билеты"
            },
            {
              "cashback": 0.05,
              "id": 33,
              "name": "Образование"
            },
            {
              "cashback": 0.05,
              "id": 34,
              "name": "Искусство"
            },
            {
              "cashback": 0.05,
              "id": 35,
              "name": "Фото/Видео"
            },
            {
              "cashback": 0.05,
              "id": 36,
              "name": "Duty Free"
            }
          ]`);
        console.log(this.cashbackSettings);
      }
    );
  }
}
