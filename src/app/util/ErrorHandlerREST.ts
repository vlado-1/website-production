import { Observable, throwError } from "rxjs";

function handleError(response: any): Observable<never> {
        let errMsg: string = '';
        errMsg = response.error.message;
        
        console.debug("%s: %s | %s", "Error Handler REST", "handleError", errMsg);
        
        return throwError(() => {
          return errMsg;
        });
}

export {handleError}