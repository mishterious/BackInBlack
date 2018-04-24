import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  rest: any;
  _id: any;
  skills: any;
  name: any;
  error: any;

  constructor(
    private _httpService: HttpService, 
    private _route: ActivatedRoute, 
    private _router: Router
  ) {}

  ngOnInit() {
    this.rest = { name: " ", cuisine: " "};
    this._route.params.subscribe((params: Params) => this._id = params['id']);
  }

  byName(name){
    let tempObservable = this._httpService.byName(this.rest.name)
    tempObservable.subscribe(data => {
      this.rest = data;
      this.error = this.rest+" ALREADY EXIST!!!!"
      console.log(this.rest + " ALREADY EXIST!!!!")
      if(!this.rest){
        this.onSubmit()
      }else{
        this.error = "This Rest is already here!";
        this._router.navigate(['/new']);
      }
    })
  }

  onSubmit() {
    
    console.log(this.rest);
    let tempObservable = this._httpService.create(this.rest)
    tempObservable.subscribe(data => {

      if((data as any).message == "Unique Error"){
        this.error = data["error"];
      }
      else if((data as any).message == "Error"){
        // console.log("See this particular user", data );
        this.error = data["error"];
        console.log("==========32454321345=======================" + data)
        console.log(this.error);
      }
      else{
        this._router.navigate(['/all']); 
      }
    });   
  }
}
