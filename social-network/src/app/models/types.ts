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
  isread: boolean;
}

export interface IUser {
  _id: string;
  username: string;
  name: string;
  password: string;
  avatar: IImage;
  background: string;
  isOnline: boolean;
  lastVisit: Date;
  subscriptions: UserDocument[] | any;
  gallery: UImageDocument[] | any;
  posts: UPostDocument[] | any;
  chats: IChat[];
  subscribers: IUser[];
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
  comments: IComment[];
}

export interface ILike {
  _id: string;
  author: IUser;
  date: Date;
}

export interface IComment {
  _id: string;
  author: IUser;
  date: Date;
  text: string;
}

export interface IPost {
  _id: string;
  author: IUser;
  date: Date;
  headline: string;
  text: string;
  images: string[];
  likes: ILike[];
  comments: IComment[];
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

export interface IAlertMessage {
  unread: number;
  sound: boolean;
}
