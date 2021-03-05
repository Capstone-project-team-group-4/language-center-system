export class User implements UserIndexSignature {

	// Variables declaration:
	public userID: number;
	public userName: string;
	public middleName: string;
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

	public constructor();

	public constructor(user: User);

	public constructor (user?: User) {
		if (typeof user !== "undefined") {
			this.userID = user.userID;
			this.userName = user.userName;
			this.firstName = user.firstName;
			this.middleName = user.middleName;
			this.lastName = user.lastName;
			this.email = user.email;
			this.phoneNumber = user.phoneNumber;
			this.password = user.password;
			this.dob = user.dob;
			this.gender = user.gender;
			this.job = user.job;
			this.photoURI = user.photoURI;
			this.selfDescription = user.selfDescription;
			this.accountStatus = user.accountStatus;
			this.dateCreated = user.dateCreated;
			this.lastLogin = user.lastLogin;
		}
		else {
			this.userID = 0;
			this.userName = "";
			this.firstName = "";
			this.middleName = "";
			this.lastName = "";
			this.email = "";
			this.phoneNumber = "";
			this.password = "";
			this.dob = new Date (0);
			this.gender = "";
			this.job = "";
			this.photoURI = "";
			this.selfDescription = "";
			this.accountStatus = "";
			this.dateCreated = new Date (0);
			this.lastLogin = new Date (0);
		}
	}
}

type stringTypeKey
	= "userName"
	| "firstName"
	| "middleName"
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