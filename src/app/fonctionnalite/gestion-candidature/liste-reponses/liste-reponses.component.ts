import { Component, OnInit } from '@angular/core';
import { ReponseService } from '../../../services/reponse.service';

@Component({
  selector: 'app-liste-reponses',
  templateUrl: './liste-reponses.component.html',
  styleUrl: './liste-reponses.component.css'
})
export class ListeReponsesComponent implements OnInit{
  reponses: any[] = [];


  constructor(private reponseService : ReponseService) { }

  ngOnInit(): void {
    this.reponseService.getMesReponses().subscribe({
      next:(data)=>{
        this.reponses = data;
        console.log(this.reponses);
      },
      error:(err)=>{
        console.error(err);
      }
    });
    // throw new Error('Method not implemented.');
  }
  // Liste des réponses

}
