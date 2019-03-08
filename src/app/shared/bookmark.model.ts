export class Bookmark {
  id: string;
  url: string;
  description: string;
  tags: string[];
  visibility: boolean;
  date: Date;

  constructor() {
    this.id = '';
    this.url = '';
    this.description = '';
    this.tags = [];
    this.visibility = true;
    this.date = new Date();
  }
}
