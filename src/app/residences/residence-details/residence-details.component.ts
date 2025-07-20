import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Residence } from 'core/models/residence';

@Component({
  selector: 'app-residence-details',
  templateUrl: './residence-details.component.html',
  styleUrls: ['./residence-details.component.css']
})
export class ResidenceDetailsComponent implements OnInit {
  residenceId!: number;
  residence?: Residence;

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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.residenceId = +idParam;
        this.residence = this.listResidences.find(r => r.id === this.residenceId);
      }
    });
  }

  goToNextResidence(): void {
    if (!this.residence) return;
    const currentIndex = this.listResidences.findIndex(r => r.id === this.residenceId);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % this.listResidences.length;
    const nextResidence = this.listResidences[nextIndex];
    this.router.navigate(['/ResidencesDetail', nextResidence.id]);
  }

  goToAddResidence(): void {
    this.router.navigate(['/addResidence']);
  }

  goToUpdateResidence(): void {
    this.router.navigate(['/addResidence'], { queryParams: { id: this.residenceId } });
  }
}
