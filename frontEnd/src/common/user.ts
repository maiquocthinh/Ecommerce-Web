export  interface UserRegisterType {
  email:string,
  password:string,
  phoneNumber:String,
  firstName:string,
  lastName:string
}
export  interface userLoginType {
  email:string,
  password:string,
}
export  interface UserType {
  id:string;
  cookie:string;
  name:string,
  email:string,
  password:string,
  phone:string,
  gender:string;
}
export interface AuthState {
  isLoggedIn: boolean;
  data: {accessTokenExpiredIn:string,accessToken:string} ; 
  loading: boolean;
  error: string | null;
}