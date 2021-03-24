import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmpRegisterComponent } from "./emp-register/emp-register.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
    {
        path: "register", component: RegisterComponent
    },
    {
        path: "emp-register", component: EmpRegisterComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthRoutingModule {}