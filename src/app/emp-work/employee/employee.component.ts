import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../../shared/models/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss', "../../../assets/scss/media/_employee.scss"]
})
export class EmployeeComponent implements OnInit {
  @Input() employee: Employee;
  isSaved: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
