import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-appartement',
  templateUrl: './add-appartement.component.html',
  styleUrls: ['./add-appartement.component.css']
})
export class AddAppartementComponent {
  apartForm!:FormGroup;

}
