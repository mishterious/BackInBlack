import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  rests : any;

  constructor(
    private _httpService: HttpService, 
    private _route: ActivatedRoute, 
    private _router: Router
  ) {}

  ngOnInit() {
    this.getRest();
  }

  getRest(){
    let observable = this._httpService.rest()
    observable.subscribe(data => 
      {
        console.log(data);
        this.rests = data;
      })

  }

  by(_id){
    console.log(_id);
    let tempObservable = this._httpService.by(_id);
    tempObservable.subscribe(data => {
      this.rests = data;
      console.log(data);
    })
  }

  deleteByID(_id){
    // console.log(_id);
    let tempObservable = this._httpService.deleteByID(_id);
    tempObservable.subscribe(data => {
      console.log(data+ "345678765432123456789765432");
    })
    this.getRest();
  }

}
