import { Observable, throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";


export function handleError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 0) {
        console.error("An error occured. Please check your network connection", error);
        return throwError("An error occured. Please check your network connection")
    }
    else {
        console.error(
            `Server Error: ${error.error} \n Response Status: ${error.status}`);

            return throwError(error.error)
    }

}