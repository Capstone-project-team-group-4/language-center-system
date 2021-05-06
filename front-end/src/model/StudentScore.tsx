// Import package members section:
import { Examination } from "./Examination";
import { HomeWork } from "./HomeWork";
import { User } from "./User";

export class StudentScore {

    // Variables declaration:
    public scoreID: number;
    public score: number;
    public status: string;
    public exam: Examination;
    public homeWork: HomeWork;
    public user: User;

    public constructor (){
        this.scoreID = 0;
        this.score = 0;
        this.status = "";
        this.exam = new Examination ();
        this.homeWork = new HomeWork ();
        this.user = new User ();
    }
}