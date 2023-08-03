import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, mergeMap, forkJoin } from 'rxjs';
import { Card } from '../types/Card';

@Injectable({
  providedIn: 'root'
})
export class CardDataService {
  private apiIdsUrl = 'https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1';
  private apiInfoBaseUrl = 'https://api.thecatapi.com/v1/images/';
  constructor(private http: HttpClient) { }

  private getIds(): Observable<string[]>{
    return this.http.get<any[]>(this.apiIdsUrl).pipe(
      map((response) => {
        return response.map((item) => item.id);
      })
    );
  }

  private getCatInfoById(id: string): Observable<Card>{
    return this.http.get<any>(this.apiInfoBaseUrl + id).pipe(
      map((response)=>{
        const breed = response.breeds[0];
        if (!breed) {
          console.error('Card info not found for the given ID', id);
        }
        return {
          id: response.id,
          url: response.url,
          width: response.width,
          height: response.height,
          name: breed.name,
          description: breed.description,
          temperament: breed.temperament,
          origin: breed.origin,
        };
      })
    );
  }

  public getCatsInfo(): Observable<Card[]> {
    return this.getIds().pipe(
      mergeMap((ids) => {
        const observables = ids.map((id) => this.getCatInfoById(id));
        return forkJoin(observables);
      })
    );
  }

}
