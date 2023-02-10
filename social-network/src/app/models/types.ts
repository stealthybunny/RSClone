export interface ILogin {
  username: string;
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
  _id: string;
  username: string;
  name: string;
  password: string;
  avatar: IImage;
  isOnline: boolean;
  lastVisit: Date;
  subscriptions: UserDocument[] | any;
  gallery: UImageDocument[] | any;
  posts: UPostDocument[] | any;
  chats: IChat[];
}

export interface IMessageBody {
  text: string;
}

export interface IImage {
  _id: string;
  author: IUser;
  date: Date;
  imgLink: string;
  likes: LikeDocument[] | any;
}

export interface UImageDocument {
  //?
}

export interface UserDocument {
  //?
}

export interface UPostDocument {
  //?
}

export interface LikeDocument {
  //?
}




