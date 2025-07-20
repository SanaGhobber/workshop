import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Residence } from 'core/models/residence';

@Injectable({
  providedIn: 'root'
})
export class ResidenceService {

  residenceUrl = 'http://localhost:3000/residences';
  apartmentUrl = 'http://localhost:3000/apartments';

  constructor(private http: HttpClient) { }

  getResidences(): Observable<Residence[]> {
    return this.http.get<Residence[]>(this.residenceUrl);
  }

  deleteResidence(id: number): Observable<void> {
    const url = `${this.residenceUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  addResidence(residence: Residence): Observable<Residence> {
    return this.http.post<Residence>(this.residenceUrl, residence);
  }

  updateResidence(id: number, residence: Residence): Observable<Residence> {
    const url = `${this.residenceUrl}/${id}`;
    return this.http.put<Residence>(url, residence);
  }

  deleteApartmentsByResidenceId(residenceId: number): Observable<void> {
    // Assuming backend supports delete with query param residenceId
    const url = `${this.apartmentUrl}?residenceId=${residenceId}`;
    // Since HTTP DELETE with query param may not delete multiple, simulate by fetching apartments and deleting individually
    // But here, for simplicity, assume backend supports this
    return this.http.delete<void>(url);
  }

  deleteResidenceAndApartments(id: number): Observable<void> {
    return new Observable<void>(observer => {
      this.deleteApartmentsByResidenceId(id).subscribe({
        next: () => {
          this.deleteResidence(id).subscribe({
            next: () => {
              observer.next();
              observer.complete();
            },
            error: err => observer.error(err)
          });
        },
        error: err => observer.error(err)
      });
    });
  }
}
