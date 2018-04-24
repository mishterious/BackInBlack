import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {
  _id: any;
  rest: any;
  name: any;
  error: any;
  message: any;

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

  addReview() {
    console.log("WERE EHR!!!!!!!!!++++++++++++")
    console.log(this._id);
    console.log("WERE EHR!!!!!!!!!++++++++++++")
    if(this.rest.message.customer.length < 3){
      this.error = "Your rest must have a better name than that!"
    }
    else if(this.rest.message.description.length < 4){
      this.error = "What kind of an animal is?"
    }
    else {
      this.message = { customer: this.rest.customer, stars: this.rest.stars, description: this.rest.description };
      console.log(this.message);
      let tempObservable = this._httpService.addReview(this._id, this.message)
      tempObservable.subscribe(data => {
        // console.log("See this particular user", data );
        this.error = data;
        console.log("==========32454321345=======================" + data)
        console.log(this.error);
        
      })
    }
  }
}
