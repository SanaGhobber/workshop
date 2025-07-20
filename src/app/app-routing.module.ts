import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResidencesComponent } from './residences/residences.component';
import { ResidenceDetailsComponent } from './residences/residence-details/residence-details.component';
import { AddResidenceComponent } from './residences/add-residence/add-residence.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ApartementsComponent } from './Apartements/apartements/apartements.component';
import { ApartementsByResidenceComponent } from './Apartements/apartements-by-residence/apartements-by-residence.component';
import { AddAppartementComponent } from './Apartements/add-appartement/add-appartement.component';

const routes: Routes = [
  {path:"Home",component:HomeComponent},
  {path:"",redirectTo:"Home",pathMatch:"full"},
{
    path: 'Residences',
    children: [
      {
        path: '',
        component: ResidencesComponent
      },
      {
        path: 'apartmentByRes',
        children: [
          {
            path: '',
            component: ApartementsByResidenceComponent
          },
          {path:"addApartment",component:AddAppartementComponent},
         
        ]
      }
    ]
  },
  
  {path:"ResidencesDetail",component:ResidenceDetailsComponent},
  {path:"addResidence",component:AddResidenceComponent},
 
 {
            path: 'appartements',
            component: ApartementsComponent
          },
  
  
  {path:"**",component:NotFoundComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
