import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { TransactionAnalizerService } from 'src/app/core/transaction-analizer.service';
import { CategoryImage } from 'src/app/models/category-image.enum';
import { CashbackSettings } from '../../models/cashback-setting.model';

@Component({
  selector: 'app-edit-cashback',
  templateUrl: './edit-cashback.component.html',
  styleUrls: ['./edit-cashback.component.scss'],
})
export class EditCashbackComponent implements OnInit {
  constructor(private transactionAnalizerService: TransactionAnalizerService) {}

  categoryImage = CategoryImage;

  cashbackSettings: CashbackSettings;
  formGroup: FormGroup;

  isLoading = false;

  ngOnInit() {
    this.formGroup = new FormGroup({});
    this.transactionAnalizerService
      .getCashbackSettings()
      .subscribe((settings) => {
        this.cashbackSettings = settings;
        for (let setting of this.cashbackSettings) {
          this.formGroup.addControl(
            setting.name,
            new FormControl(setting.cashback * 100, [
              Validators.min(0),
              Validators.max(100),
            ])
          );
        }
      });
  }

  saveCashbackSettings() {
    this.isLoading = true;
    forkJoin(
      Object.entries(this.formGroup.controls).map(
        ([categoryName, control]: [string, FormControl]) =>
          this.transactionAnalizerService.updateCashbackSettings(
            categoryName,
            String(control.value / 100)
          )
      )
    ).subscribe((res) => {
      this.isLoading = false;
      console.log(res);
    });
  }
}
