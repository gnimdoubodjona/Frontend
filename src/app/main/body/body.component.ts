import { Component , Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ReponseComponent } from '../../fonctionnalite/gestion-candidature/reponse/reponse.component';
import { ReponseService } from '../../services/reponse.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class BodyComponent implements OnInit{
  private reponseSub!: Subscription;
  
  constructor(private reponseService : ReponseService) { }

  ngOnInit(): void {
    console.log('BodyComponent: ngOnInit called, subscribing to reponseEnvoyee$');
    
    this.reponseSub = this.reponseService.reponseEnvoyee$.subscribe(() => {
      const swalInstance = Swal.fire({
        title: 'Messages!',
        text: 'Vous avez reçu une reponse',
        icon: 'info',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
          confirmButton: 'custom-swal-confirm-button'
        },
        allowOutsideClick: false, // Empêche la fermeture en cliquant à l'extérieur
      });
  
      // Fermer automatiquement après 10 secondes si l'utilisateur n'a pas cliqué sur "OK"
      const timeout = setTimeout(() => {
        if (Swal.isVisible()) { // Vérifie si le modal est toujours visible
          console.log('BodyComponent: SweetAlert closed automatically after 10 seconds');
          Swal.close(); // Ferme le modal
        }
      }, 10000); // 10 secondes
  
      // Si l'utilisateur clique sur "OK", annule le timeout
      swalInstance.then(() => {
        console.log('BodyComponent: SweetAlert closed by user');
        clearTimeout(timeout); // Annule le timeout
      });
    });
  }

  ngOnDestroy(): void {
    if (this.reponseSub) {
      this.reponseSub.unsubscribe();
    }
  }


}
