export class Bookmark {
  id: number;
  url: string;
  description: string;
  tags: string[];
  visibility: boolean;
  date: Date;

  constructor() {
    this.id = null;
    this.url = '';
    this.description = '';
    this.tags = [];
    this.visibility = true;
    this.date = new Date();
  }
}
