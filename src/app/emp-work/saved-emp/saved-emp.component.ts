import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/app/core/models/employee.model';
import { emitToast } from 'src/app/core/utils/success.util';
import { EmpService } from 'src/app/shared/services/emp.service';

@Component({
  selector: 'app-saved-emp',
  templateUrl: './saved-emp.component.html',
  styleUrls: ['./saved-emp.component.scss', "../../../assets/scss/media/_employee.scss"]
})
export class SavedEmpComponent implements OnInit {
  @Input() employee: Employee;
  isSaved: boolean = false;

  constructor(private emp: EmpService) { }

  ngOnInit(): void {
  }



}
