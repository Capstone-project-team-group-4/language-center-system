// Import package members section:
import { AxiosError, AxiosResponse } from "axios";
import { LoggedInUser } from "../../model/LoggedInUser";
import { RegisterForm } from "../../model/RegisterForm";
import { User } from "../../model/User";

export class TypeGuard {

    // Variables declaration:
    private isValid: boolean | undefined;
    private testSample: unknown;
    
    public isAxiosResponse (
        serverResponse: unknown
    ): serverResponse is AxiosResponse<unknown> {
        this.isValid = false;
        if (serverResponse != undefined){
            if ((
                    serverResponse as AxiosResponse<unknown>
            ).status != undefined){
                this.isValid = true; 
            }
        }
        return this.isValid;
    }

    public isAxiosError (error: unknown): error is AxiosError<unknown> {
        this.isValid = false;
        if (error != undefined){
            if ((error as AxiosError<unknown>).isAxiosError === true){
                this.isValid = true; 
            }
        }
        return this.isValid;
    }

    public isRegisterFormArray (
            unknownObject: unknown
    ): unknownObject is Array<RegisterForm> {
        this.isValid = false;
        if (Array.isArray (unknownObject)){
            if (unknownObject.length > 0){
                this.testSample = unknownObject[0]; 
                if (this.isRegisterForm (this.testSample)){
                    this.isValid = true;
                }
            }
            else {
                this.isValid = true;
            }  
        }
        return this.isValid;
    }

    public isLoggedInUser (
            unknownObject: unknown
    ): unknownObject is LoggedInUser {
        this.isValid = false;
        if (unknownObject != undefined){
            if ((unknownObject as LoggedInUser).roleHolder != undefined){
                this.isValid = true;
            }
        }
        return this.isValid;
    }

    public isRegisterForm (
            unknownObject: unknown
    ): unknownObject is RegisterForm {
        this.isValid = false;
        if (unknownObject != undefined){
            if ((unknownObject as RegisterForm).userName != undefined){
                this.isValid = true;
            }
        }
        return this.isValid;
    } 

    public isUser (unknownObject: unknown): unknownObject is User {
        this.isValid = false;
        if (unknownObject != undefined){
            if ((unknownObject as User).accountStatus != undefined){
                this.isValid = true;
            }
        }
        return this.isValid;
    }

    public isUserArray (
            unknownObject: unknown
    ): unknownObject is Array<User> {
        this.isValid = false;
        if (Array.isArray (unknownObject)){
            if (unknownObject.length > 0){
                this.testSample = unknownObject[0]; 
                if (this.isUser (this.testSample)){
                    this.isValid = true;
                }
            }
            else {
                this.isValid = true;
            }  
        }
        return this.isValid;
    }
}