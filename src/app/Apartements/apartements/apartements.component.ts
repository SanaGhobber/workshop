import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'core/services/common.service';

@Component({
  selector: 'app-apartements',
  templateUrl: './apartements.component.html',
  styleUrls: ['./apartements.component.css']
})
export class ApartementsComponent {

  constructor(private router: Router, private commonService: CommonService) {}

  goToAddApartment(): void {
    this.router.navigate(['/Residences/apartmentByRes/addApartment']);
  }

  getSurfaceCount(surface: string): number {
    // Assuming you have a list of apartments, for now, this is a placeholder
    const apartmentsList = [
      { surface: '50' },
      { surface: '70' },
      { surface: '50' },
      { surface: '90' }
    ];
    return this.commonService.getSameValueOf(apartmentsList, 'surface', surface);
  }
}
