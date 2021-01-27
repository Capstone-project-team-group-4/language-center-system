export class User implements UserIndexSignature {

    // Variables declaration:
    public userID: number;
	public userName: string;
	public firstName: string;
	public lastName: string;
	public email: string;
	public dob: Date;
	public phoneNumber: string;
	public gender: string;
	public job: string;
	public photoURI: string;
	public selfDescription: string;
	public password: string;
	public accountStatus: string;
	public dateCreated: Date;
	public lastLogin: Date;
	
	constructor (){
		this.userID = 0;
		this.userName = "";
		this.firstName = "";
		this.lastName = "";
		this.email = "";
		this.dob = new Date ();
		this.phoneNumber = "";
		this.gender = "";
		this.job = "";
		this.photoURI = "";
		this.selfDescription = "";
		this.password = "";
		this.accountStatus = "";
		this.dateCreated = new Date ();
		this.lastLogin = new Date ();
	}
}

type stringTypeKey 
    = "userName" 
    | "firstName"
    | "lastName"
    | "email"
    | "phoneNumber"
    | "gender"
    | "job"
    | "photoURI"
    | "selfDescription"
    | "password"
	| "accountStatus";
	
export type UserIndexSignature = {
	[key in stringTypeKey]?: string;
}