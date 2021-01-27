import { AxiosResponse } from "axios";

export class TypeGuard {

    // Variables declaration:
    private _isValid: boolean | undefined;
    
    public isAxiosResponse (
        serverResponse: AxiosResponse | undefined
    ): serverResponse is AxiosResponse {
        this._isValid = false;
        if ((serverResponse as AxiosResponse).status !== undefined){
            this._isValid = true; 
        }
        return this._isValid;
    }
}