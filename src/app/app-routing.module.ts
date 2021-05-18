import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuicklinkStrategy } from 'ngx-quicklink';
import { HomeComponent } from './home/home.component';
import { EmployerGuard } from "./core/guards/employer.guard";
import { SeekerGuard } from "./core/guards/seeker.guard";
import { JobSeekerComponent } from './job-seeker/job-seeker.component';
import { LangsResolverService } from './shared/services/resolvers/langs-resolver.service';
import { ProfileResolverService } from './shared/services/resolvers/profile.resolver.service';
import { SkillsResolverService } from './shared/services/resolvers/skills-resolver.service';

const routes: Routes = [
  {
    path: "home", component: HomeComponent
  },

  {
    path: "work", loadChildren: () => import("./work/work.module").then(m => m.WorkModule), canLoad: [SeekerGuard]
  },
  {
    path: "find", loadChildren: () => import("./emp-work/emp-work.module").then(m => m.EmpWorkModule), canLoad: [EmployerGuard]
  },
  {
    path: "auth", loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "", redirectTo: "home", pathMatch: "full"
  },
  {
    path: "**", redirectTo: "home", pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: QuicklinkStrategy })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
