/* eslint prefer-promise-reject-errors: ["error", {"allowEmptyReject": true}] */
// Import package members section:
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { NewUser } from "../../model/NewUser";
import { Role } from "../../model/Role";
import { AxiosInstanceGet } from "./AxiosInstanceGet";
import { ErrorHandle } from "./ErrorHandle";
import { TypeGuard } from "./TypeGuard";

export class NewUserAPI {

    // Variables declaration:
    private axiosInstance: AxiosInstance;
    private axiosInstanceGetter: AxiosInstanceGet;
    private errorHandler: ErrorHandle;
    private axiosError: AxiosError<unknown> | undefined; 
    private newUserHolder: NewUser[] | undefined;
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
            newUser: NewUser
    ): Promise<void> {
        try {
            await this.axiosInstance.post<undefined> (
                    "/new-users"
                    , newUser
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
    ): Promise<NewUser[]> {
        this.requestParameterHolder = new URLSearchParams ();
        this.requestParameterHolder.set ("pageNumber", pageNumber.toString ());
        this.requestParameterHolder.set ("pageSize", pageSize.toString ());
        try {
            this.serverResponse = await this.axiosInstance.get<unknown> (
                    "/new-users"
                    , {params: this.requestParameterHolder}
            );
            if (this.typeGuardian.isNewUserArray (this.serverResponse.data)){
                this.newUserHolder = this.serverResponse.data;
                return Promise.resolve<NewUser[]> (this.newUserHolder);
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
        userID: number
        , newAccountRoleList: Role[]  
    ): Promise<void> {
        try {
            await this.axiosInstance.patch<undefined> (
                    `/new-users/${userID}:accept`
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
            userID: number
    ): Promise<void> {
        try {
            await this.axiosInstance.delete<undefined> (
                    `/new-users/${userID}`
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