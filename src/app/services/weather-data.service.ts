import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  constructor(private http:HttpClient) { }

  /**
   * 
   * @param lat latitude of town
   * @param lon longitude of town
   * @returns data from weather api call containing weather data
   */
  public getData(lat: string, lon: string){
    let url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+environment.weatherKey;
    return this.http.get(url);
  }
}
