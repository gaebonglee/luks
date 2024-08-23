import { Request } from "express";

export interface UserSession {
  id: string;
  pw: string;
  member_name: string;
  role: string;
  email: string;
  phonenumber: string;
  postcode: string;
  basic_address: string;
  detail_address: string;
}
export interface CustomSession extends Request {
  session: {
    user?: UserSession;
    save(callback?: (err: any) => void): void;
    destroy(callback?: (err: any) => void): void;
  };
}
