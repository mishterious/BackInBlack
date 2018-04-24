import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  pet: any;
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
    this.pet = { name: " ", animal_type: " ", description: " ", skill1: " ", skill2: "", skill3:" "};
    this._route.params.subscribe((params: Params) => this._id = params['id']);
  }

  byName(name){
    let tempObservable = this._httpService.byName(this.pet.name)
    tempObservable.subscribe(data => {
      this.pet = data;
      this.error = this.pet+" ALREADY EXIST!!!!"
      console.log(this.pet + " ALREADY EXIST!!!!")
      if(!this.pet){
        this.onSubmit()
      }else{
        this.error = "This Pet is already here!";
        this._router.navigate(['/new']);
      }
    })
  }

  onSubmit() {

    // this.byName(this.pet.name);

    
    console.log(this.pet);
    let tempObservable = this._httpService.create(this.pet)
    tempObservable.subscribe(data => {
      // console.log("See this particular user", data );
      this.pet = data;
      console.log("==========32454321345=======================" + data)
      console.log(this.pet);
    })
    this._router.navigate(['/all']);  
  }
}
