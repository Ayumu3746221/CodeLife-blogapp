export class User {
  id: string;
  user: string;
  iconUrl?: string;
  introduction?: string;
  mail: string;

  constructor(data: any) {
    this.id = data.id;
    this.user = data.user;
    this.iconUrl = data.iconUrl;
    this.introduction = data.introduction;
    this.mail = data.mail;
  }
}
