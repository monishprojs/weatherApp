import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpenWeatherComponent } from './modules/open-weather/open-weather.component';

const routes: Routes = [
  { path: '', redirectTo: 'weather', pathMatch: 'full' },
  { path: 'weather', component: OpenWeatherComponent, data:{title:'weather'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
