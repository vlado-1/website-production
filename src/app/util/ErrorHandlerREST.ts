import { Observable, throwError } from "rxjs";

/**
 * Log any errors that the server throws.
 * 
 * @param {any} response Response from server 
 * @returns 
 */
function handleError(response: any): Observable<never> {
        let errMsg: string = '';
        errMsg = response.error.message;
        
        console.debug("%s: %s | %s", "Error Handler REST", "handleError", errMsg);
        
        return throwError(() => {
          return errMsg;
        });
}

export {handleError}