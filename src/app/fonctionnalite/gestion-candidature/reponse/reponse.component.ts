import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reponse',
  templateUrl: './reponse.component.html',
  styleUrl: './reponse.component.css'
})
export class ReponseComponent {
  @Input() candidatureId! : number;
  showForm: boolean = false;
  

}
