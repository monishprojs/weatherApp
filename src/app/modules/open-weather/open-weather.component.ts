import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { WeatherDataService } from 'src/app/services/weather-data.service';

@Component({
  selector: 'app-open-weather',
  templateUrl: './open-weather.component.html',
  styleUrls: ['./open-weather.component.scss']
})
export class OpenWeatherComponent implements OnInit {

  constructor(private location: LocationService, private weatherData: WeatherDataService) { }

  ngOnInit(): void {
  }


  //variables to be displayed in the html portion of weather app
  town: string = ''; //town 
  icon: string = ''; //icon displaying weather
  link: string = ''; //link for icon above on openweathermap
  linkReady : boolean = false; //boolean for whether or not data has been retrieved and is ready to be presented
  temp: string = ''; //current temperature (originally in Kelvin)
  clouds: string = ''; //status of the sky
  humidity: string = ''; //humiditity (%)
  wind: string = ''; //wind speed (mph)
  zip: string = ''; //zip code

  /**
   * gets the town from the zip code, or gets the town from a string
   */
  public getTown(){
    let input = (document.getElementById("zip") as HTMLInputElement | null);
    if (input !=null){
      this.zip = input.value;
    }
    if (!isNaN(this.zip as unknown as number)){
    if (this.zip!=null){
      let code: string = this.zip;
      this.location.getTown(code,true).subscribe(data=>{
      this.sort(data);
    })
    }
  }
  else{
     if (this.zip!=null){
      let code: string = this.zip;
      this.location.getTown(code,false).subscribe(data=>{
      this.sort(data);
    })
      
    }
  }
  
}

/**
 * 
 * @param data data obtained from first api call in geTown(), used for longitude and latitude
 * gets the longitude and latitude, and passes them into a second api call to get weather
 */
  public sort(data: any){
    this.town = data.name;
    const {lat,lon} = data.coord;
    this.weatherData.getData(lat,lon).subscribe(data=>{
      this.results(data);
  })
}

/**
 * 
 * @param data data from second api call to get weather
 * sets the variables displayed displayed in html to desired values
 */
public results(data:any){
  this.icon = data.weather[0].icon;
  this.link = "https://openweathermap.org/img/wn/"+this.icon+"@2x.png"
  this.linkReady = true;
  this.temp = this.faren(data.main.feels_like);
  this.clouds = data.weather[0].description;
  this.humidity = data.main.humidity;
  this.wind = data.wind.speed;
}

/**
 * 
 * @param kelvin temp in kelvin
 * @returns temp in farenheit
 */
public faren(kelvin: string){
  let placeholder = kelvin as unknown as number;
  placeholder = ((placeholder-273.15)*1.8)+32;
  placeholder = Math.round(placeholder*100)/100;
  let faren : string = placeholder as unknown as string;
  return faren;
}

}
