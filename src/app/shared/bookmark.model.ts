export class Bookmark {
  url: string;
  description: string;
  tags: string[];
  visibility: boolean;
  date: Date;

  constructor() {
    this.url = '';
    this.description = '';
    this.tags = [];
    this.visibility = true;
    this.date = new Date();
  }
}
