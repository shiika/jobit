import { Component, Input, OnInit } from '@angular/core';
import { JobDesc } from 'src/app/core/models/job.model';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss', "../../../assets/scss/media/_job.scss"]
})
export class JobComponent implements OnInit {
  @Input() job: JobDesc;

  constructor() { }

  ngOnInit(): void {
  }

}
