import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-rewrite',
  templateUrl: './rewrite.component.html',
  styleUrls: ['./rewrite.component.css']
})
export class RewriteComponent implements OnInit {
  _id: any;
  rest: any;
  name: any;
  error: any;
  message: any;
  mystar: any;

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

      if(this.rest.stars == "5"){
        this.mystar = 5;
      }
      else if(this.rest.stars == "4"){
        this.mystar = 4;
      }
      else if(this.rest.stars == "3"){
        this.mystar = 3;
      }
      else if(this.rest.stars == "2"){
        this.mystar = 2;
      }
      else{
        this.mystar = 1;
      }

      console.log(this.rest.stars);
      this.message = { customer: this.rest.customer, stars: this.mystar, description: this.rest.description };
      console.log(this.message);
      let tempObservable = this._httpService.addReview(this._id, this.message)
      tempObservable.subscribe(data => {
        // console.log("See this particular user", data );
        this.error = data;
        console.log("==========32454321345=======================" + data)
        console.log(this.error);
        
      })
      this._router.navigate(['/all']); 
    }
  // }
}
