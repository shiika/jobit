import { Observable, throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { emitErrorToast } from "./success.util";


export function handleError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 0) {
        console.error("An error occured. Please check your network connection", error);
        emitErrorToast(`An error occured. Please check your network connection`, `Response Status: ${error.status}`, "OK")
        return throwError("An error occured. Please check your network connection")
    }
    else {
        console.log(error);
        emitErrorToast(`Something Failed`, `Response Status: ${error.status}`, "OK")
        console.error(
            `Server Error: ${error.error} \n Response Status: ${error.status}`);
            return throwError(error.error)
    }

}