/* eslint prefer-promise-reject-errors: ["error", {"allowEmptyReject": true}] */
// Import package members section:
import { AxiosError } from "axios";
import { ExceptionResponseBody } from "../../model/ExceptionResponseBody";
import { TypeGuard } from "./TypeGuard";

export class ErrorHandle {

    // Variables declaration:
    private typeGuardian: TypeGuard;
    private exceptionResponseBody: ExceptionResponseBody | undefined; 
    
    public constructor (){
        this.typeGuardian = new TypeGuard ();
    }

    public handleApiError (apiError: unknown): Promise<AxiosError<unknown>> { 
        if (this.typeGuardian.isAxiosError (apiError)){
            if (apiError.response){
                // The request was made and the server responded 
                // with a status code that falls out of the range of 2xx.
                this.exceptionResponseBody = (
                    apiError.response.data as ExceptionResponseBody
                );
                apiError.name = this.exceptionResponseBody.exceptionName;
                apiError.message = this.exceptionResponseBody.message;
                return Promise.resolve<AxiosError<unknown>> (apiError);
            }
            else if (apiError.request){
                // The request was made but no response was received.
                apiError.name = "No response !";
                apiError.message 
                    = `The request was made but no response was received.`;
                return Promise.resolve<AxiosError<unknown>> (apiError);
            }
            else {
                // Something happened in setting up the request 
                // that triggered an Error.
                console.error (apiError.toJSON ());
                return Promise.reject ();
            }
        }
        else {
            throw new Error ("This server response is not valid !");
        }
    }
}