export class NewUser {

    // Variables declaration:
    public userID: number;
	public userName: string;
	public firstName: string;
	public lastName: string;
	public email: string;
	public phoneNumber: string;
	public password: string;
	
	constructor (){
		this.userID = 0;
		this.userName = "";
		this.firstName = "";
		this.lastName = "";
		this.email = "";
		this.phoneNumber = "";
		this.password = "";
	}
}

type stringTypeKey 
    = "userName" 
    | "firstName"
    | "lastName"
    | "email"
    | "phoneNumber"
    | "password";
	
export type NewUserIndexSignature = {
	[key in stringTypeKey]?: string;
}