import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { User } from '../../../models/user.model'
import 'rxjs/add/operator/filter'

@Injectable()
export class UserService {
  private url: string = 'https://jsonplaceholder.typicode.com/users'
  private cacheList: Observable<User[]>
  private isInitialLoad: boolean = true

  constructor (private _http: Http) {
  }

  list (): Observable<User[]> {
    if (this.isInitialLoad) {
      this.isInitialLoad = false
      return this.cacheList = this._http.get(`${this.url}`).map(res => res.json())
    } else {
      return this.cacheList
    }
  }

  get (id: number): Observable<User> {
    return this._http.get(`${this.url}/${id}`).map(res => res.json())
  }

  create (payloads: User): Observable<Response> {
    return this._http.post(`${this.url}`, payloads).map(res => res.json())
  }

  update (id: number, payloads: User): Observable<Response> {
    return this._http.put(`${this.url}/${id}`, payloads).map(res => res.json())
  }

  remove (id: number): Observable<Response> {
    this.cacheList = this.cacheList.map(users => users.filter(user => user.id !== id))

    // fail remote operation
    return this._http.delete(`${this.url}/${id}`).map(res => res.json())
  }
}
