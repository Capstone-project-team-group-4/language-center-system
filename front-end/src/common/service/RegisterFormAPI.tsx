/* eslint prefer-promise-reject-errors: ["error", {"allowEmptyReject": true}] */
// Import package members section:
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { RegisterForm } from "../../model/RegisterForm";
import { Role } from "../../model/Role";
import { AxiosInstanceGet } from "./AxiosInstanceGet";
import { ErrorHandle } from "./ErrorHandle";
import { TypeGuard } from "./TypeGuard";

export class RegisterFormAPI {

    // Variables declaration:
    private axiosInstance: AxiosInstance;
    private axiosInstanceGetter: AxiosInstanceGet;
    private errorHandler: ErrorHandle;
    private axiosError: AxiosError<unknown> | undefined; 
    private registerFormHolder: RegisterForm[] | undefined;
    private serverResponse: AxiosResponse<unknown> | undefined;
    private requestParameterHolder: URLSearchParams | undefined; 
    private typeGuardian: TypeGuard;
    
    public constructor (){
        this.axiosInstanceGetter = new AxiosInstanceGet ();
        this.axiosInstance = this.axiosInstanceGetter.getNewInstance ();
        this.errorHandler = new ErrorHandle ();
        this.typeGuardian = new TypeGuard (); 
    }
    
    public async registerNewCreateAccountRequest (
            registerForm: RegisterForm
    ): Promise<void> {
        try {
            await this.axiosInstance.post<undefined> (
                    "/register-forms"
                    , registerForm
            );
            return Promise.resolve<undefined> (undefined);
        }
        catch (apiError: unknown){
            try {
                this.axiosError 
                    = await this.errorHandler.handleApiError (apiError); 
                return Promise.reject (this.axiosError);
            }
            catch (apiError2: unknown){
                return Promise.reject ();
            }
        }   
    }

    public async getAllCreateAccountRequest (
            pageNumber: number
            , pageSize: number
    ): Promise<RegisterForm[]> {
        this.requestParameterHolder = new URLSearchParams ();
        this.requestParameterHolder.set ("pageNumber", pageNumber.toString ());
        this.requestParameterHolder.set ("pageSize", pageSize.toString ());
        try {
            this.serverResponse = await this.axiosInstance.get<unknown> (
                    "/register-forms"
                    , {params: this.requestParameterHolder}
            );
            if (this.typeGuardian.isRegisterFormArray (
                    this.serverResponse.data
            )){
                this.registerFormHolder = this.serverResponse.data;
                return Promise.resolve<RegisterForm[]> (
                        this.registerFormHolder
                );
            } 
            else {
                throw new Error ("This server response is not valid !");
            }  
        }
        catch (apiError: unknown){
            try {
                this.axiosError 
                    = await this.errorHandler.handleApiError (apiError); 
                return Promise.reject (this.axiosError);
            }
            catch (apiError2: unknown){
                return Promise.reject ();
            }
        }
    }

    public async acceptCreateAccountRequest (
        formID: number
        , newAccountRoleList: Role[]  
    ): Promise<void> {
        try {
            await this.axiosInstance.patch<undefined> (
                    `/register-forms/${formID}:accept`
                    , newAccountRoleList
            );
            return Promise.resolve<undefined> (undefined);
        }
        catch (apiError: unknown){
            try {
                this.axiosError 
                    = await this.errorHandler.handleApiError (apiError); 
                return Promise.reject (this.axiosError);
            }
            catch (apiError2: unknown){
                return Promise.reject ();
            }
        }
    }

    public async rejectCreateAccountRequest (
            formID: number
    ): Promise<void> {
        try {
            await this.axiosInstance.delete<undefined> (
                    `/register-forms/${formID}`
            );
            return Promise.resolve<undefined> (undefined);
        }
        catch (apiError: unknown){
            try {
                this.axiosError 
                    = await this.errorHandler.handleApiError (apiError); 
                return Promise.reject (this.axiosError);
            }
            catch (apiError2: unknown){
                return Promise.reject ();
            }
        }
    }
}