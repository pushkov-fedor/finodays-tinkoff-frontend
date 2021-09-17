import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CashbackSettings } from '../models/cashback-setting.model';
import { Predict } from '../models/predict.model';
import { UserMetrics } from '../models/user-metrics.model';
import { User } from '../models/user.model';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AverageMetrics } from '../models/average-metrics.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionAnalizerService {
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get<User[]>(`${environment.webApiBaseUrl}/user/list`);
  }

  getUserPrediction(userId: number) {
    return this.http.get<Predict[]>(
      `${environment.webApiBaseUrl}/user/result/${userId}`
    );
  }

  getCashbackSettings() {
    return this.http.get<CashbackSettings>(
      `${environment.webApiBaseUrl}/cashback`
    );
  }

  updateCashbackSettings(category: string, value: string) {
    return this.http.get(`${environment.webApiBaseUrl}/cashback/set`, {
      params: {
        category,
        value,
      },
    });
  }

  getUserMetrics(user_id: number, month: 1 | 2 = 1): Observable<UserMetrics> {
    return this.http
      .get<[UserMetrics]>(`${environment.webApiBaseUrl}/metrics`, {
        params: {
          user_id: String(user_id),
          month: String(month),
        },
      })
      .pipe(map(([metrics]) => metrics));
  }

  getAverageMetrics(month: 1 | 2, users_count: number = 4000) {
    return this.http.get<AverageMetrics>(
      `${environment.webApiBaseUrl}/metrics_average`,
      {
        params: {
          users_count: String(users_count),
          month: String(month),
        },
      }
    );
  }
}
