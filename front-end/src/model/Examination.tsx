import { Course } from "./Course";

export class Examination {

    // Variables declaration:
    public examID: number;
    public startTime: Date;
    public type: string;
    public duration: number;
    public maxNumberOfAttempt: number;
    public dateCreated: Date;
    public lastModified: Date;
    public totalNumberOfQuiz: number;
    public course: Course;

    public constructor ();

    public constructor (exam: Examination);

    public constructor (exam?: Examination){
        if (typeof exam !== "undefined"){
            this.examID = exam.examID;
            this.startTime = exam.startTime;
            this.type = exam.type;
            this.duration = exam.duration;
            this.maxNumberOfAttempt = exam.maxNumberOfAttempt;
            this.dateCreated = exam.dateCreated;
            this.lastModified = exam.lastModified;
            this.totalNumberOfQuiz = exam.totalNumberOfQuiz;
            this.course = exam.course;
        }
        else {
            this.examID = 0;
            this.startTime = new Date (0);
            this.type = "";
            this.duration = NaN;
            this.maxNumberOfAttempt = NaN;
            this.dateCreated = new Date (0);
            this.lastModified = new Date (0);
            this.totalNumberOfQuiz = 0;
            this.course = new Course ();
        }
    }
}