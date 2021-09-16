import { Component, Input } from '@angular/core';
import { Predict } from 'src/app/models/predict.model';
import { UserMetrics } from 'src/app/models/user-metrics.model';

enum CategoryImage {
  'Финансовые услуги' = 'https://st.depositphotos.com/1005404/1692/i/600/depositphotos_16920649-stock-photo-big-bank.jpg',
  'Авиабилеты' = 'https://cdn21.img.ria.ru/images/148211/15/1482111521_0:283:5424:3334_1920x0_80_0_0_07780dfcdd42e58f06b12eae0656e952.jpg',
  'Наличные' = 'https://icdn.lenta.ru/images/2020/06/11/15/20200611155233215/square_1280_240aaad1be1bb53126263a933c5576db.jpg',
}

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.scss'],
})
export class PredictComponent {
  @Input() userMetrics: UserMetrics;

  categoryImage = CategoryImage;

  mapIndexPosition2Str(index: number) {
    switch (index) {
      case 0:
        return 'Первое место';
      case 1:
        return 'Второе место';
      case 2:
        return 'Третье место';
    }
  }
}
