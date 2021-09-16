import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CashbackSettings } from '../models/cashback-setting.model';
import { Predict } from '../models/predict.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionAnalizerService {
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get<User[]>(`${environment.webApiBaseUrl}/user/list`);
  }

  getUserPrediction(userId: number) {
    return this.http.get<Predict>(
      `${environment.webApiBaseUrl}/user/result/${userId}`
    );
  }

  getCashbackSettings() {
    return this.http.get<CashbackSettings>(
      `${environment.webApiBaseUrl}/cashback`
    );
  }
}
