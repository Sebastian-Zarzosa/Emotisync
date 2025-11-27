import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Ejercicio } from '../../../../models/ejercicio';
import { Ejerciciosservice } from '../../../../core/services/ejerciciosservice';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-ejerciciolistar',
  standalone: true,
  imports: [MatTableModule, CommonModule,MatIconModule,MatButtonModule,RouterLink,MatCardModule,],
  templateUrl: './ejerciciolistar.html',
  styleUrls: ['./ejerciciolistar.css'],
})
export class Ejerciciolistar implements OnInit {
  dataSource: MatTableDataSource<Ejercicio> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c3', 'c4', 'c5','c6', 'c7'];
  
  constructor(private eS:Ejerciciosservice) {}

  ngOnInit(): void {
    this.eS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

  
  this.eS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
}

  eliminar(id:number){
    this.eS.delete(id).subscribe(data=>{
      this.eS.list().subscribe(data=>{
        this.eS.setList(data);
      })
    });
}
}
