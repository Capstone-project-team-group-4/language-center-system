export class NewUser {

    // Variables declaration:
    public userID: number;
	public userName: string;
	public firstName: string;
	public lastName: string;
	public email: string;
	public phoneNumber: string;
	public password: string;
	
	public constructor ();

	public constructor (newUser: NewUser);

	public constructor (newUser?: NewUser){
		if (typeof newUser !== "undefined"){
			this.userID = newUser.userID;
			this.userName = newUser.userName;
			this.firstName = newUser.firstName;
			this.lastName = newUser.lastName;
			this.email = newUser.email;
			this.phoneNumber = newUser.phoneNumber;
			this.password = newUser.password;	
		}
		else {
			this.userID = 0;
			this.userName = "";
			this.firstName = "";
			this.lastName = "";
			this.email = "";
			this.phoneNumber = "";
			this.password = "";
		}
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