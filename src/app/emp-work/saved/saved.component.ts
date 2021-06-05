import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/core/models/employee.model';
import { EmpService } from 'src/app/shared/services/emp.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss']
})
export class SavedComponent implements OnInit {
  employees: Observable<Employee[]>;

  constructor(private employer: EmpService) { }

  ngOnInit(): void {
    this.employer.getSavedSeekers().subscribe();
    this.employees = this.employer.$savedSeekers;
  }

}
