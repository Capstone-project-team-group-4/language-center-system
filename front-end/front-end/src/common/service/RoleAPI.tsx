// Import package members section:
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { AxiosInstanceGet } from "./AxiosInstanceGet";
import { ErrorHandle } from "./ErrorHandle";
import { Role } from "../../model/Role";
import { TypeGuard } from "./TypeGuard";

export class RoleAPI {

    // Variables declaration:
    private axiosInstance: AxiosInstance;
    private axiosInstanceGetter: AxiosInstanceGet;
    private errorHandler: ErrorHandle;
    private axiosError: AxiosError<unknown> | undefined; 
    private serverResponse: AxiosResponse<unknown> | undefined;
    private roleHolder: Role[] | undefined;
    private typeGuardian: TypeGuard;

    public constructor (){
        this.axiosInstanceGetter = new AxiosInstanceGet ();
        this.axiosInstance = this.axiosInstanceGetter.getNewInstance ();
        this.errorHandler = new ErrorHandle ();
        this.typeGuardian = new TypeGuard ();
    }

    public async getAllRole (): Promise<Role[]> {
        try {
            this.serverResponse = await this.axiosInstance.get<unknown> (
                    "/roles"
            );
            if (this.typeGuardian.isRoleArray (this.serverResponse.data)){
                this.roleHolder = this.serverResponse.data;
                return Promise.resolve<Role[]> (this.roleHolder);
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
                return Promise.reject (apiError2);
            }
        }
    } 
}
