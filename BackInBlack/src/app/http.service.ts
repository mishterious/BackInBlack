import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  pets(){
    return this._http.get('/pets');
  }

  by(id){
      return this._http.get('/by/'+id);
  }

  byName(name){
      return this._http.get('/byName/'+name);
  }

  create(pet){
      return this._http.post('/create', pet);
  }

  edit(id, newTask){
      return this._http.post('/edit/'+id, newTask);
  }

  deleteByID(id){
      return this._http.delete('/delete/'+id);
  }

  quotesBy(id){
      return this._http.get('/quotesBy/'+id);
  }

  addQuote(id, quote){
      return this._http.put('/addQuote/'+id, quote);
  }

  updateRank(id, rank){
      return this._http.put('/like/'+id, rank);
  }

  changeRank(quote_id, rank){
      return this._http.put('/update/'+quote_id, rank);
  }

}
