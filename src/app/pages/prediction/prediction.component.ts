import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { TransactionAnalizerService } from 'src/app/core/transaction-analizer.service';
import { AverageMetrics } from 'src/app/models/average-metrics.model';
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

  usersMetrics: UserMetrics[][] = [];
  averageMetrics: AverageMetrics;

  averageMetrics1: AverageMetrics;
  averageMetrics2: AverageMetrics;

  isLoading = false;
  loadingMessage = '';

  ngOnInit() {
    this.isLoading = true;
    this.loadingMessage = 'Подождите пожалуйста 15-20 секунд';
    forkJoin(
      this.transactionAnalizerService.getAllUsers(),
      this.transactionAnalizerService.getAverageMetrics(1),
      this.transactionAnalizerService.getAverageMetrics(2)
    ).subscribe(([users, am1, am2]) => {
      this.users = users;
      this.usersOptions = this.getUsersOptions();
      this.averageMetrics1 = am1;
      this.averageMetrics2 = am2;
      this.isLoading = false;
      this.loadingMessage = '';
      console.log(am1, am2);
    });

    this.userIdControl.valueChanges.subscribe((value) => {
      this.pageIndex = 0;
      this.usersOptions = this.getUsersOptions();
      console.log(this.usersOptions);
    });
  }

  onPredict() {
    this.isLoading = true;
    forkJoin(
      this.transactionAnalizerService.getUserMetrics(
        this.userIdControl.value,
        1
      ),
      this.transactionAnalizerService.getUserMetrics(
        this.userIdControl.value,
        2
      )
    ).subscribe(([um1, um2]) => {
      this.userIdControl.reset();
      this.userIdControl.setValue('');
      this.pageIndex = 0;
      const hasUserMertrics = this.usersMetrics.find((userMetrics) => {
        const [userMetric1] = userMetrics;
        return userMetric1.party_rk === um1.party_rk;
      });
      if (!hasUserMertrics) {
        this.usersMetrics.push([um1, um2]);
      }
      this.isLoading = false;
    });
  }

  getUsersOptions() {
    const searchTerm = this.userIdControl.value;
    const options = this.users.slice(0, 200).filter((user) => {
      const userPrkStr = String(user.party_rk);
      return userPrkStr.startsWith(searchTerm);
    });
    const slicedOptions = options.slice(
      0,
      (this.pageIndex + 1) * this.usersPerPage
    );
    this.pageIndex++;
    return slicedOptions;
  }

  onScroll(event) {
    this.usersOptions = this.getUsersOptions();
  }
}
