// Import package members section:
import { AxiosError } from "axios";
import { ExceptionResponseBody } from "../../model/ExceptionResponseBody";
import { TypeGuard } from "./TypeGuard";

export class ErrorHandle {

    // Variables declaration:
    private typeGuardian: TypeGuard;
    private exceptionResponse: ExceptionResponseBody | undefined; 
    
    public constructor (){
        this.typeGuardian = new TypeGuard ();
    }

    public handleApiError (apiError: unknown): Promise<AxiosError<unknown>> { 
        if (this.typeGuardian.isAxiosError (apiError)){
            if (apiError.response){
                // The request was made and the server responded 
                // with a status code that falls out of the range of 2xx.              
                if (this.typeGuardian.isExceptionResponseBody (
                        apiError.response.data    
                )){
                    this.exceptionResponse = (apiError.response.data);
                    apiError.name = this.exceptionResponse.exceptionTitle;
                    apiError.message = this.exceptionResponse.message;
                }
                else {
                    apiError.name = "An unknown error has occurred !";
                    apiError.message = "Please contact our Admin for support.";
                }
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
                return Promise.reject (apiError.toJSON ());
            }
        }
        else {
            return Promise.reject (
                    new Error ("This server response is not valid !")
            );
        }
    }
}