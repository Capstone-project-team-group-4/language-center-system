/* eslint prefer-promise-reject-errors: ["error", {"allowEmptyReject": true}] */
// Import package members section:
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { NewUser } from "../../model/NewUser";
import { AxiosInstanceGet } from "./AxiosInstanceGet";
import { ErrorHandle } from "./ErrorHandle";

export class NewUserAPI {

    // Variables declaration:
    private axiosInstance: AxiosInstance;
    private axiosInstanceGetter: AxiosInstanceGet;
    private errorHandler: ErrorHandle;
    private axiosError: AxiosError<unknown> | undefined; 
    private newUserHolder: NewUser[] | undefined;
    private serverResponse: AxiosResponse<NewUser[]> | undefined;
    
    constructor (){
        this.axiosInstanceGetter = new AxiosInstanceGet ();
        this.axiosInstance = this.axiosInstanceGetter.getNewInstance ();
        this.errorHandler = new ErrorHandle ();
    }
    
    public async registerNewUser (newUser: NewUser): Promise<void> {
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

    public async getAllNewUser (): Promise<NewUser[]> {
        try {
            this.serverResponse = await this.axiosInstance.get<NewUser[]> (
                "/new-users"
            );
            this.newUserHolder = this.serverResponse.data;
            return Promise.resolve<NewUser[]> (this.newUserHolder);
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