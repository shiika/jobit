import { Component, Input, OnInit } from '@angular/core';
import { JobDesc } from 'src/app/core/models/job.model';
import { DataService } from 'src/app/shared/services/data.service';
import { EmpService } from 'src/app/shared/services/emp.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss', "../../../assets/scss/media/_job.scss"]
})
export class JobComponent implements OnInit {
  @Input() job: JobDesc;

  constructor(private emp: EmpService) { }

  ngOnInit(): void {
  }

  removeJob(id: number): void {
    this.emp.removeJob(this.job.ID).subscribe(res => console.log(res));
  }

}
