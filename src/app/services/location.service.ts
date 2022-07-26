import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http:HttpClient) { }

  /**
   * 
   * @param zip zip code or town
   * @param isNumeric whether or not the input is numeric (zip code) or not (town)
   * @returns data from geocode api call, used in this case to obtain latitude and longitude
   */
  public getTown(zip: string, isNumeric: boolean){
    if (isNumeric==true){
    let url = 'https://api.openweathermap.org/data/2.5/weather?zip='+zip+',US&appid='+environment.weatherKey;
    return this.http.get(url);
    }
    else{
      let url = 'https://api.openweathermap.org/data/2.5/weather?q='+zip+'&appid='+environment.weatherKey;
    return this.http.get(url);
    }
  }
}
