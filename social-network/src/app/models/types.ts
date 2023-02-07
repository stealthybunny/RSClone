export interface ILogin {
  userName: string;
  password: string;
}

export interface IRegister {
  username: string;
  name: string;
  password: string;
}

export interface IToken {
  _id: string;
  token: string;
}

export interface IChat {
  _id: string;
  users: IUser[];
  lastMessage: Date;
  messages: IMessage[];
}

export interface IMessage {
  author: IUser;
  date: Date;
  text: string;
  isRead: boolean;
}

export interface IUser {
  username: string;
  name: string;
  password: string;
  //avatar: UImageDocument;
  isOnline: boolean;
  lastVisit: Date;
  //subscriptions: UserDocument[];
  //gallery: UImageDocument[];
  //posts: UPostDocument[];
  chats: IChat[];
}
