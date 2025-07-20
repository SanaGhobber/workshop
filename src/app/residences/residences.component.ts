import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Residence } from 'core/models/residence';
import { CommonService } from 'core/services/common.service';
import { ResidenceService } from 'core/services/residence.service';

@Component({
  selector: 'app-residences',
  templateUrl: './residences.component.html',
  styleUrls: ['./residences.component.css']
})
export class ResidencesComponent implements OnInit {

  listResidences: Residence[] = [];

  favorites: Residence[] = [];
  searchTerm: string = '';

  constructor(
    private router: Router,
    private commonService: CommonService,
    private residenceService: ResidenceService
  ) {}

  ngOnInit(): void {
    this.residenceService.getResidences().subscribe(residences => {
      this.listResidences = residences;
    });
  }

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

  getAddressCount(address: string): number {
    return this.commonService.getSameValueOf(this.listResidences, 'address', address);
  }

  goToDetail(id:number){
    this.router.navigate(['/ResidencesDetail', id]);
  }

  goToApartmentsList(residenceId: number): void {
    this.router.navigate(['/Residences/apartmentByRes'], { queryParams: { residenceId: residenceId } });
  }

  deleteResidence(id: number): void {
    this.residenceService.deleteResidenceAndApartments(id).subscribe({
      next: () => {
        this.listResidences = this.listResidences.filter(residence => residence.id !== id);
        alert('Résidence supprimée avec succès.');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de la résidence:', err);
        alert('Erreur lors de la suppression de la résidence.');
      }
    });
  }
}
