import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatchesComponent } from './catches/catches.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
	{ path: 'map', component: MapComponent },
	{ path: 'catches', component: CatchesComponent },
	{ path: '**', redirectTo: '/catches' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
