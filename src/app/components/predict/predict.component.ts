import { Component, Input } from '@angular/core';
import { Predict } from 'src/app/models/predict.model';
import { UserMetrics } from 'src/app/models/user-metrics.model';

enum CategoryImage {
  'Наличные' = 'https://icdn.lenta.ru/images/2020/06/11/15/20200611155233215/square_1280_240aaad1be1bb53126263a933c5576db.jpg',
  'Супермаркеты' = 'https://barcelonatm.ru/wp-content/uploads/2018/01/supermarkety-v-barselone-1.jpg',
  'Разные товары' = 'https://blog.1424marketinggroup.com/hs-fs/hub/414495/file-2022338120-jpg/raw_images/holidays/1424-Photorealistic-D-shopping-cart.jpg',
  'Транспорт' = 'https://automediapro.ru/upload/content_images/2019-0/5cd4de5ea2016bb67d662b0eb506c557.jpg',
  'Связь/Телеком' = 'http://www.zmnvest.ru/upload/iblock/a3c/original.jpg',
  'Топливо' = 'https://findesk.ru/upload/iblock/8f7/8f7c44afc937212edfe19de177299407.jpg',
  'Финансовые услуги' = 'https://st.depositphotos.com/1005404/1692/i/600/depositphotos_16920649-stock-photo-big-bank.jpg',
  'Авиабилеты' = 'https://cdn21.img.ria.ru/images/148211/15/1482111521_0:283:5424:3334_1920x0_80_0_0_07780dfcdd42e58f06b12eae0656e952.jpg',
  'Сувениры' = 'https://i2.photo.2gis.com/images/branch/38/5348024566456496_49b4.jpg',
  'Фаст Фуд' = 'https://avatars.mds.yandex.net/get-zen_doc/1875160/pub_5ff35cbff906b168728cc411_5ff35cf1fe4e686f6acc8b95/scale_1200',
  'Дом/Ремонт' = 'https://static.tildacdn.com/tild3562-3665-4063-a637-663338623862/stroi-material-dlya-.jpeg',
  'Сервисные услуги' = 'https://www.landrover.ru/sdlmedia/637475214650357280SI.jpg?v=1',
  'Красота' = 'https://cdn1.ozone.ru/s3/multimedia-q/6009922958.jpg',
  'Медицинкие услуги' = 'https://3prostozdorovye.ru/wp-content/uploads/2019/11/1-55.jpg',
  'Одежда/Обувь' = 'https://easttouch.my-magazine.me/main/upload/photoalbum/original/54077b92c5b2c/86abd601f1f281632beec36ecdca999e79c97824.jpg',
  'Частные услуги' = 'https://static.wixstatic.com/media/874179_d0ae85324a024c959684269bc40b25b7.jpg',
  'Рестораны' = 'https://v-kurse.ru/wp-content/uploads/2021/06/spo-10-595f5741cab2a.jpg',
  'Развлечения' = 'https://imya-sonnik.ru/wp-content/uploads/2019/10/parks.png',
  'НКО' = 'https://detfond.com/wp-content/uploads/2020/01/kak-zanyatsya-blagotvoritelnostyu.jpg',
  'Книги' = 'https://media.professionali.ru/processor/topics/original/2020/12/28/9915cfcd590f46938dcbc51a6275b273.jpg',
  'Кино' = 'https://oteplicah.com/wp-content/uploads/2021/01/22-scaled.jpg',
  'Автоуслуги' = 'https://integritytransmission.net/Files/EmailCampaigns/AdobeStock_77452038.jpeg',
  'Музыка' = 'https://i.pinimg.com/736x/9f/9e/48/9f9e48151df41aa1f156ebf2e403a946.jpg',
  'Отели' = 'https://www.roomguru.ru/himg/6c/ce/a2/ice-122332474-66704502_3XL-369500.jpg',
  'Аптеки' = 'https://pharmacysos.com.au/wp-content/uploads/2019/04/istock-659965216.jpg',
  'Цветы' = 'https://папаростов.рф/800/600/https/creative-grupp.ru/upload/iblock/1da/1da48c10f2cfad12e20ad7ece75918d1.jpg',
  'Ж/д билеты' = 'https://news.allelets.ru/data/images/news/17548/large2/0bb82cc6fe6f8f0486d4787811f13184bdee1a21.jpg',
  'Спорттовары' = 'https://союзженскихсил.рф/upload/main/d45/d457138b75a9cd09635294d16add13e6.jpg',
  'Госсборы' = 'https://data.nalog.ru/cdn/image/2071739/original.jpg',
  'Аренда авто' = 'https://mybayutcdn.bayut.com/mybayut/wp-content/uploads/Car-rental-companies-in-Abu-Dhabi-C-04-06.jpg',
  'Животные' = 'https://pp.userapi.com/n4iKUYfSksNo5o8B3R7OB1cDTAnQszmfVKidvA/Y8Mv11gky14.jpg',
  'Duty Free' = 'https://turproezdka.ru/wp-content/uploads/2018/05/ris.1-magazin-s-besposhlinnoj-torgovlej.-2.jpg',
  'Турагентства' = 'https://traveltimes.ru/wp-content/uploads/2021/07/problemy-turistov.jpg',
  'Образование' = 'https://2022g.ru/wp-content/uploads/2021/04/1-1-1.jpeg',
  'Искусство' = 'https://funart.pro/uploads/posts/2020-04/1587309514_25-p-foni-iz-kartinnikh-galerei-58.jpg',
  'Фото/Видео' = 'https://photolite.ru/wp-content/uploads/2021/03/woman-using-slr-camera-2179205-scaled-1.jpg',
}

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
