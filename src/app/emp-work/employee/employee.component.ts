import { Component, Input, OnInit } from '@angular/core';
import { EmpService } from 'src/app/shared/services/emp.service';
import { Employee } from '../../core/models/employee.model';
import {emitToast} from "../../core/utils/success.util";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss', "../../../assets/scss/media/_employee.scss"]
})
export class EmployeeComponent implements OnInit {
  @Input() employee: Employee;
  isSaved: boolean = false;

  constructor(private emp: EmpService) { }

  ngOnInit(): void {
    this.isSaved = this.employee.isSaved;
  }

  saveSeeker(id: number, e: Event): void {
    e.stopPropagation();
    this.emp.saveSeeker(id).subscribe(
      (res: string) => {
        this.isSaved = true;
        emitToast(res, "Check your favourite employee in Saved panel", "OK", "Done")
          .then()
      }
    );
  }

  unSaveSeeker(id: number, e: Event): void {
    e.stopPropagation();
    this.emp.deleteSeeker(id).subscribe()
  }

}
