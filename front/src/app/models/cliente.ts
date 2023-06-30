export class Client {
    constructor(document = '', name = '', genre = '', documentType = 1) {
        this.document = document;
        this.name = name;
        this.genre = genre;
        this.documentType = documentType;
    }
    document: string;
	name: string;
	genre: string;
	documentType: number | null;
}