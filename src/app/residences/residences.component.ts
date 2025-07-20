import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Residence } from 'core/models/residence';

@Component({
  selector: 'app-residences',
  templateUrl: './residences.component.html',
  styleUrls: ['./residences.component.css']
})
export class ResidencesComponent {

  constructor( private router:Router){}

  listResidences: Residence[] = [
    {id: 1, name: "El fel", address: "Borj Cedria",
     image: "../../assets/images/gettyimages-1293762741-612x612.jpg", status: "Disponible"},
    {id: 2, name: "El yasmine", address: "Ezzahra",
     image: "../../assets/images/gettyimages-1357529194-612x612.jpg", status: "Disponible"},
    {id: 3, name: "El Arij", address: "Rades",
     image: "../../assets/images/istockphoto-1272163106-612x612.jpg", status: "Vendu"},
    {id: 4, name: "El Anber", address: "inconnu",
     image: "../../assets/images/pexels-jessica-bryant-592135-1370704.jpg", status: "En Construction"}
  ];

  favorites: Residence[] = [];
  searchTerm: string = '';

  get filteredResidences(): Residence[] {
    if (!this.searchTerm) {
      return this.listResidences;
    }
    return this.listResidences.filter(residence =>
      residence.address.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  showLocation(residence: Residence): void {
    if (residence.address === 'inconnu') {
      alert("L'adresse de cette résidence est inconnu");
    } else {
      alert(`Adresse: ${residence.address}`);
    }
  }

  addToFavorites(residence: Residence): void {
    if (!this.favorites.includes(residence)) {
      this.favorites.push(residence);
      alert(`${residence.name} a été ajouté aux favoris.`);
    } else {
      alert(`${residence.name} est déjà dans les favoris.`);
    }
  }


  goToDetail(id:number){
    this.router.navigate(['/ResidencesDetail'],{
      queryParams: {id: id}
    });
  }
}
