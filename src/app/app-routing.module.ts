import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
  {
    path: "home", component: HomeComponent
  },

  {
    path: "work", loadChildren: () => import("./work/work.module").then(m => m.WorkModule)
  },
  {
    path: "register", component: RegisterComponent
  },
  {
    path: "", redirectTo: "home", pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
