import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Input() myID;
  _id: any;
  rest: any;
  name: any;
  error: any;


  constructor(
    private _httpService: HttpService, 
    private _route: ActivatedRoute, 
    private _router: Router
  ) { }

  ngOnInit() {
    this.rest = { name: " " };
    this._route.params.subscribe((params: Params) => this._id = params['id']);
    this.nameByID(this.myID);
  }

  nameByID(_id){
    console.log(_id);
    let tempObservable = this._httpService.by(_id);
    tempObservable.subscribe(data => {
      this.rest = data;
      console.log(data);
    })
  }

  edit(_id) {
    if(this.rest.name.length < 3){
      this.error = "Your rest must have a better name than that!"
    }
    else if(this.rest.cuisine.length < 4){
      this.error = "What kind of an animal is?"
    }
    else {

      console.log(this.rest);
      let tempObservable = this._httpService.edit(_id, this.rest)
      tempObservable.subscribe(data => {
        this.rest = data;
      });
      this._router.navigate(['/all']);  
    }
  }

}
