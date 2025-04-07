import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReponseService } from '../../../services/reponse.service';

@Component({
  selector: 'app-reponse',
  templateUrl: './reponse.component.html',
  styleUrl: './reponse.component.css'
})


export class ReponseComponent implements OnInit{

  reponseForm : FormGroup;
  @Input() reponse : boolean  = true;
  // @Input() candidatureId! : number ;

  @Output() modalFerme = new EventEmitter<void>();
  @Input() candidatureId: number | null = null;


  constructor(private reponseService : ReponseService, private fb: FormBuilder){
    this.reponseForm = this.fb.group({
      // reponse: ['', Validators.required],
      motifs: ['', Validators.required],
      // candidature: ['', Validators.required],
    });
  }


  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  onSubmit() {
  if (this.reponseForm.valid && this.candidatureId !== null) {
    const motif = this.reponseForm.value.motifs;
  
    this.reponseService.setReponseAvecMotif(this.reponse, this.candidatureId, motif)
      .subscribe(() => {
        alert('Réponse envoyée avec succès');
        this.modalFerme.emit(); // Ferme le modal
      });
  }
}

}
