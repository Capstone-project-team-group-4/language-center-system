// Import package members section:
import { AxiosError, AxiosResponse } from "axios";

export class TypeGuard {

    // Variables declaration:
    private isValid: boolean | undefined;
    
    public isAxiosResponse (
        serverResponse: unknown
    ): serverResponse is AxiosResponse {
        this.isValid = false;
        if ((serverResponse as AxiosResponse).status !== undefined){
            this.isValid = true; 
        }
        return this.isValid;
    }

    public isAxiosError (error: unknown): error is AxiosError<unknown> {
        this.isValid = false;
        if ((error as AxiosError).isAxiosError){
            this.isValid = true; 
        }
        return this.isValid;
    }
}