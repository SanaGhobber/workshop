import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Apartment } from 'core/models/apartment';
import { ResidenceService } from 'core/services/residence.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-residence',
  templateUrl: './add-residence.component.html',
  styleUrls: ['./add-residence.component.css']
})
export class AddResidenceComponent implements OnInit {
  residenceForm!: FormGroup;

  statusOptions = ['Disponible', 'En Construction', 'Vendu'];

  constructor(
    private fb: FormBuilder,
    private residenceService: ResidenceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.residenceForm = this.fb.group({
      id: [{value: '', disabled: true}],
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', Validators.required],
      image: ['', [Validators.required, Validators.pattern('https?://.+')]],
      status: ['Disponible', Validators.required],
      apartments: this.fb.array([])
    });

    this.route.queryParamMap.subscribe((params: any) => {
      const idParam = params.get('id');
      if (idParam) {
        const id = +idParam;
        this.residenceService.getResidences().subscribe((residences: any[]) => {
          const residence = residences.find(r => r.id === id);
          if (residence) {
            this.residenceForm.patchValue({
              id: residence.id,
              name: residence.name,
              address: residence.address,
              image: residence.image,
              status: residence.status
            });
            // Clear existing apartments FormArray
            while (this.apartments.length !== 0) {
              this.apartments.removeAt(0);
            }
            // Add apartments to FormArray
            (residence.apartments || []).forEach((apartment: any) => {
              const apartmentGroup = this.fb.group({
                apartmentNumber: [apartment.apartmentNumber, [Validators.required, Validators.pattern('^[0-9]+$')]],
                floorNumber: [apartment.floorNumber, [Validators.required, Validators.pattern('^[0-9]+$')]],
                surface: [apartment.surface, Validators.required],
                terrace: [apartment.terrace, Validators.required],
                surfaceTerrace: [{value: apartment.surfaceTerrace, disabled: apartment.terrace !== 'yes'}, Validators.required],
                category: [apartment.category, Validators.required]
              });
              apartmentGroup.get('terrace')?.valueChanges.subscribe(value => {
                const surfaceTerraceControl = apartmentGroup.get('surfaceTerrace');
                if (value === 'yes') {
                  surfaceTerraceControl?.enable();
                } else {
                  surfaceTerraceControl?.disable();
                  surfaceTerraceControl?.setValue('');
                }
              });
              this.apartments.push(apartmentGroup);
            });
          }
        });
      }
    });
  }

  get apartments(): FormArray {
    return this.residenceForm.get('apartments') as FormArray;
  }

  addApartment(): void {
    const apartmentGroup = this.fb.group({
      apartmentNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      floorNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      surface: ['', Validators.required],
      terrace: ['no', Validators.required],
      surfaceTerrace: [{value: '', disabled: true}, Validators.required],
      category: ['', Validators.required]
    });

    apartmentGroup.get('terrace')?.valueChanges.subscribe(value => {
      const surfaceTerraceControl = apartmentGroup.get('surfaceTerrace');
      if (value === 'yes') {
        surfaceTerraceControl?.enable();
      } else {
        surfaceTerraceControl?.disable();
        surfaceTerraceControl?.setValue('');
      }
    });

    this.apartments.push(apartmentGroup);
  }

  removeApartment(index: number): void {
    this.apartments.removeAt(index);
  }

  onSubmit(): void {
    if (this.residenceForm.valid) {
      const residenceData = this.residenceForm.getRawValue();
      if (residenceData.id) {
        this.residenceService.updateResidence(residenceData.id, residenceData).subscribe({
          next: () => {
            alert('Résidence mise à jour avec succès.');
            this.router.navigate(['/Residences']);
          },
          error: (err) => {
            console.error('Erreur lors de la mise à jour de la résidence:', err);
            alert('Erreur lors de la mise à jour de la résidence.');
          }
        });
      } else {
        this.residenceService.addResidence(residenceData).subscribe({
          next: () => {
            alert('Résidence ajoutée avec succès.');
            this.router.navigate(['/Residences']);
          },
          error: (err) => {
            console.error('Erreur lors de l\'ajout de la résidence:', err);
            alert('Erreur lors de l\'ajout de la résidence.');
          }
        });
      }
    }
  }
}
