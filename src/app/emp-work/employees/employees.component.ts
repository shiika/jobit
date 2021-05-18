import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpService } from 'src/app/shared/services/emp.service';
import { Employee } from "../../core/models/employee.model";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employer: EmpService) { }

  ngOnInit(): void {
    console.log(this.employees)
    this.employer.getEmployees()
      .subscribe(
        (emps: Employee[]) => {
          this.employees = emps;
        }
      )
  }

}
