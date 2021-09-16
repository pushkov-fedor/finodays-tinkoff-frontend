import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCashbackComponent } from './pages/edit-cashback/edit-cashback.component';
import { PredictionComponent } from './pages/prediction/prediction.component';

const routes: Routes = [
  {
    path: '',
    component: PredictionComponent,
  },
  {
    path: 'edit-cashback',
    component: EditCashbackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
