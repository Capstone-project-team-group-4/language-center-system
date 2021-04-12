

export class LocalStorageService{
    
    public getLoggedUserName() {
        return JSON.parse(localStorage.getItem('account') || '{}').userName;
    }

}