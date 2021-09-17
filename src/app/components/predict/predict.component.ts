import { Component, Input } from '@angular/core';
import { CategoryImage } from 'src/app/models/category-image.enum';
import { Predict } from 'src/app/models/predict.model';
import { UserMetrics } from 'src/app/models/user-metrics.model';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.scss'],
})
export class PredictComponent {
  @Input() userMetrics: UserMetrics[];

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
