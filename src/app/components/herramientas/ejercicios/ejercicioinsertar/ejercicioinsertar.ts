import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule,  Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { ActivatedRoute, Params} from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormControl} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Ejercicio } from '../../../../models/ejercicio';
import { Ejerciciosservice } from '../../../../core/services/ejerciciosservice';

@Component({
  selector: 'app-ejercicioinsertar',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    CommonModule,
    MatRadioModule,
    MatNativeDateModule,
    MatButtonModule],
  templateUrl: './ejercicioinsertar.html',
  styleUrls: ['./ejercicioinsertar.css'],
})
export class Ejercicioinsertar implements OnInit {
form:FormGroup=new FormGroup({});
ejer:Ejercicio=new Ejercicio();
edicion: boolean =  false;

id: number = 0;
today = new Date();
tipos: {value:string,viewValue:string}[]=[
  {value:'cardio',viewValue:'Cardio'},
  {value:'fuerza',viewValue:'Fuerza'},
  {value:'flexibilidad',viewValue:'Flexibilidad'},
  {value:'equilibrio',viewValue:'Equilibrio'}
];

constructor(private eS:Ejerciciosservice,
            private router:Router,
            private formBuilder:FormBuilder,
            private route: ActivatedRoute
          ){}

ngOnInit(): void {

  
  this.form=this.formBuilder.group({
    id: [''],
    nombre:['',Validators.required],
    descripcion:['',Validators.required],
    tipoEjercicio:['',Validators.required]
  });

  this.route.params.subscribe((data: Params)=>{
    this.id=data['id'];
    this.edicion=data['id'] != null; 
      this.init();
  })

}
aceptar():void{
  
  if (this.form.valid){
    this.ejer.idEjercicio=this.form.value.id;
    this.ejer.nombre=this.form.value.nombre;
    this.ejer.descripcion=this.form.value.descripcion;
    this.ejer.tipoEjercicio=this.form.value.tipoEjercicio;

    if (this.edicion){
      this.eS.update(this.ejer).subscribe((data)=>{
        this.eS.list().subscribe((data)=>{
          this.eS.setList(data);
        });
      });
    }else{
      this.eS.insert(this.ejer).subscribe((data)=>{
        this.eS.list().subscribe((data)=>{
          this.eS.setList(data);
        });
      });
    }
    this.router.navigate(['/ejercicios']);
  }
}

init(){
  if (this.edicion){
    this.eS.listId(this.id).subscribe((data) =>{
        this.form=this.formBuilder.group({
          id: new FormControl(data.idEjercicio),
          nombre: new FormControl(data.nombre),
          descripcion: new FormControl(data.descripcion),
          tipoEjercicio: new FormControl(data.tipoEjercicio)
        });
      });
    }
  }
}