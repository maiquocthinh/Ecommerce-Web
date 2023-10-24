export  interface UserRegisterType {
  // name:string,
  email:string,
  password:string,
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
  data: {id?:string|number,token:string} ; 
  loading: boolean;
  error: string | null;
}