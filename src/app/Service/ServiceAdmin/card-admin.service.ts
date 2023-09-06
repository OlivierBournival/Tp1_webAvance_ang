import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from 'src/app/model/Card';

@Injectable({
  providedIn: 'root'
})
export class CardAdminService {

  constructor(public http : HttpClient) { }

  async create(card : Card): Promise<void>
  {

  }

  async edit(card : Card): Promise<void>
  {

  }
  async delete(id : Number): Promise<void>
  {

  }
}
