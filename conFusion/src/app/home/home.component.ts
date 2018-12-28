import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    expand(),
    flyInOut()
  ]
})

export class HomeComponent implements OnInit {

  dish: Dish;
  DishErrMess: string;
  promotion: Promotion;
  PromoErrMess: string;
  leader: Leader;
  LeaderErrMess: string;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice: LeaderService,
    @Inject('baseURL') private baseURL) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
      .subscribe(dish => this.dish = dish,
      errmess => this.DishErrMess = <any>errmess );
    this.promotionservice.getFeaturedPromotion()
      .subscribe(promotion => this.promotion = promotion,
      errmess => this.PromoErrMess = <any>errmess );
    this.leaderservice.getFeaturedLeader()
      .subscribe(leader => this.leader = leader,
      errmess => this.LeaderErrMess = <any>errmess );
  }
}
