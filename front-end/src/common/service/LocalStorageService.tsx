
export class LocalStorageService{
    
    public getLoggedUserName() {
        return JSON.parse(localStorage.getItem('account') || '{}').userName;
    }

    public setLoggedUserName(loggedInUser: any) {
        return localStorage.setItem('account', JSON.stringify(loggedInUser));
    }
}