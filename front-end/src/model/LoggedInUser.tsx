// Import package members section:
import { Role } from "./Role";

export class LoggedInUser {
    
    // Variables declaration:
    public userName: string;
    public roleHolder: Role[];

	public constructor ();

	public constructor (userName?: string, roleHolder?: Role[]){
		if (
				(typeof userName !== "undefined") 
				&& (typeof roleHolder !== "undefined")
		){
			this.userName = userName;
			this.roleHolder = roleHolder;
		}
		else {
			this.userName = "";
			this.roleHolder = new Array<Role> ();
		}
	}
}