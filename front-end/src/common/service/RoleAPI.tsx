/* eslint prefer-promise-reject-errors: ["error", {"allowEmptyReject": true}] */
// Import package members section:
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { AxiosInstanceGet } from "./AxiosInstanceGet";
import { ErrorHandle } from "./ErrorHandle";
import { Role } from "../../model/Role";

export class RoleAPI {

    // Variables declaration:
    private axiosInstance: AxiosInstance;
    private axiosInstanceGetter: AxiosInstanceGet;
    private errorHandler: ErrorHandle;
    private axiosError: AxiosError<unknown> | undefined; 
    private serverResponse: AxiosResponse<Role[]> | undefined;
    private roleHolder: Role[] | undefined;

    public constructor (){
        this.axiosInstanceGetter = new AxiosInstanceGet ();
        this.axiosInstance = this.axiosInstanceGetter.getNewInstance ();
        this.errorHandler = new ErrorHandle ();
    }

    public async getAllRole (): Promise<Role[]> {
        try {
            this.serverResponse = await this.axiosInstance.get<Role[]> (
                    "/roles"
            );
            this.roleHolder = this.serverResponse.data;
            return Promise.resolve<Role[]> (this.roleHolder);
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
