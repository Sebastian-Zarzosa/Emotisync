import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Sintoma } from '../../../models/sintoma';
import { Sintomaservice } from '../../../services/sintomaservice';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sintoma-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './sintoma-list.html',
  styleUrl: './sintoma-list.css',
})
export class SintomaList implements OnInit {
  dataSource: MatTableDataSource<Sintoma> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  constructor(private sS: Sintomaservice) {}

  ngOnInit(): void {
    this.sS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.sS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.sS.delete(id).subscribe(() => {
      this.sS.list().subscribe((data) => {
        this.sS.setList(data);
      });
    });
  }
}
