import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  @Input() questions: {question: string, answer: string | null}[] = [
    {
      question: "What makes you ideal to this job?",
      answer: "Nothing Special"
    },
    {
      question: "Where do you see yourself after 2 hours?",
      answer: "Nothing Special"
    },
    {
      question: "Do you have the ability to start immediately?",
      answer: "Nothing Special"
    },
  ];
  jobId: string;
  constructor( 
    private data: DataService,
    private router: Router) { }

  ngOnInit(): void {
  }

  applyJob(): void {
    this.data.applyJob(this.data.jobId)
      .subscribe(
        async (res: string) => {
          const swal = (await import("sweetalert2")).default;
            swal.fire({
              title: res,
              text: "keep track of your application",
              icon: "success",
              confirmButtonText: "Done",
              showConfirmButton: true
              // buttons: ["Return to homepage", "Find jobs"]
            })
            .then(value => {
              this.router.navigate(["/work/explore"])
            })
        }
      )
  }

}
