export class Lesson {

    // Variables declaration:
    public lessonID: number;
	public lessonName: string;
	public description: string;
	public courseID: number;
	public contentURI: string;
	public type: string;
	public duration: number;
	public dateCreated: Date;
	public lastModified: Date;
	
	public constructor ();

	public constructor (lesson: Lesson);

	public constructor (lesson?: Lesson){
		if (typeof lesson !== "undefined"){
			this.lessonID = lesson.lessonID;
			this.lessonName = lesson.lessonName;
			this.description = lesson.description;
			this.courseID = lesson.courseID;
			this.contentURI = lesson.contentURI;
			this.type = lesson.type;
			this.duration = lesson.duration;
			this.dateCreated = lesson.dateCreated;
			this.lastModified = lesson.lastModified;
		}
		else {
			this.lessonID = 0;
			this.lessonName = "";
			this.description = "";
			this.courseID = 0;
			this.contentURI = "";
			this.type = "";
			this.duration = 0;
			this.dateCreated = new Date();
			this.lastModified = new Date();
		}
	}
}

type stringTypeKey 
    = "lessonName" 
    | "description"
    | "courseID"
    | "contentURI"
    | "type"
    | "duration"
    | "dateCreated"
    | "lastModified";
	
export type UserIndexSignature = {
	[key in stringTypeKey]?: string;
}