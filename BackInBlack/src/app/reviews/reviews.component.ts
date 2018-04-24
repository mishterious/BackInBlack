import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  @Input() myID;
  _id: any;
  rest: any;
  name: any;
  error: any;
  reviews: any;

  constructor(
    private _httpService: HttpService, 
    private _route: ActivatedRoute, 
    private _router: Router
  ) { }

  ngOnInit() {
    this.rest = { name: " " };
    this._route.params.subscribe((params: Params) => this._id = params['id']);
    this.restByID(this._id);
  }

  restByID(_id){
    // console.log(_id);
    let tempObservable = this._httpService.by(_id);
    tempObservable.subscribe(data => {

      this.rest = data;
      console.log(this.rest);
    })
  }

}
