import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuicklinkStrategy } from 'ngx-quicklink';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: "home", component: HomeComponent
  },

  {
    path: "work", loadChildren: () => import("./work/work.module").then(m => m.WorkModule)
  },
  {
    path: "find", loadChildren: () => import("./emp-work/emp-work.module").then(m => m.EmpWorkModule)
  },
  {
    path: "auth", loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "", redirectTo: "home", pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: QuicklinkStrategy })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
