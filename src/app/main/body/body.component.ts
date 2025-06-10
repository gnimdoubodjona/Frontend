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
    
    
  }

  ngOnDestroy(): void {
    if (this.reponseSub) {
      this.reponseSub.unsubscribe();
    }
  }


}
