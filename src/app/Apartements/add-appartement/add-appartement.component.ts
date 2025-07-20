 import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Apartment } from 'core/models/apartment';

@Component({
  selector: 'app-add-appartement',
  templateUrl: './add-appartement.component.html',
  styleUrls: ['./add-appartement.component.css']
})
export class AddAppartementComponent implements OnInit {
  apartForm!: FormGroup;
  newApart!: Apartment;

  ngOnInit(): void {
    this.apartForm = new FormGroup({
      apartmentNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      floorNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      surface: new FormControl('', Validators.required),
      terrace: new FormControl('no', Validators.required),
      surfaceTerrace: new FormControl({value: '', disabled: true}, Validators.required),
      category: new FormControl('', Validators.required)
    });

    this.apartForm.get('terrace')?.valueChanges.subscribe(value => {
      const surfaceTerraceControl = this.apartForm.get('surfaceTerrace');
      if (value === 'yes') {
        surfaceTerraceControl?.enable();
      } else {
        surfaceTerraceControl?.disable();
        surfaceTerraceControl?.setValue('');
      }
    });
  }

  onSubmit(): void {
    if (this.apartForm.valid) {
      this.newApart = this.apartForm.value;
      console.log('New Apartment:', this.newApart);
    }
  }
}

