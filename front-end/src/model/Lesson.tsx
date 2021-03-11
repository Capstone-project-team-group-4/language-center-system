export class Lesson implements UserIndexSignature {

	// Variables declaration:
	// public lessonID: number;
	public lessonName: string;
	public description: string;
	// public courseID: number;
	public contentURI: string;
	public lessonType: string;
	// public duration: number;
	// public dateCreated: Date;

	public constructor();

	public constructor(lesson: Lesson);

	public constructor (lesson?: Lesson) {
		if (typeof lesson !== "undefined") {
			// this.lessonID = lesson.lessonID;
            this.lessonName = lesson.lessonName;
            this.description = lesson.description;
            // this.courseID = lesson.courseID;
            this.contentURI = lesson.contentURI;
            this.lessonType = lesson.lessonType;
            // this.duration = lesson.duration;
            // this.dateCreated = lesson.dateCreated;
		}
		else {
			// this.lessonID = 0;
			this.lessonName = "";
			this.description = "";
			// this.courseID = 0;
			this.contentURI = "";
			this.lessonType = "";
			// this.duration = 0;
			// this.dateCreated = new Date(0);
		}
	}
}

type stringTypeKey
	= "lessonID"
	| "lessonName"
	| "description"
	| "courseID"
	| "contentURI"
	| "lessonType"
	| "duration"
	| "dateCreated"

export type UserIndexSignature = {
	[key in stringTypeKey]?: string;
}